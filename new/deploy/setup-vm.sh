#!/usr/bin/env bash
# One-time setup for an AWS EC2 Amazon Linux instance hosting the /new app.
# Run with a sudo-capable account.
#
# Usage:
#   bash setup-vm.sh https://github.com/Aravinthan333/portfolio_site.git main
#
set -euo pipefail

REPO_URL="${1:-}"
GIT_REF="${2:-main}"
APP_ROOT="${APP_ROOT:-/var/www/portfolio}"
APP_DIR="$APP_ROOT/new"
APP_USER="${APP_USER:-portfolio}"
NODE_MAJOR="${NODE_MAJOR:-20}"
SWAP_SIZE_MB="${SWAP_SIZE_MB:-2048}"

if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 <git-repo-url> [ref]"
  echo "Example: $0 https://github.com/Aravinthan333/portfolio_site.git main"
  exit 1
fi

echo "==> Installing Node.js ${NODE_MAJOR}.x, git, and nginx"
if command -v dnf >/dev/null 2>&1; then
  PACKAGE_MANAGER=dnf
elif command -v yum >/dev/null 2>&1; then
  PACKAGE_MANAGER=yum
else
  echo "This script supports Amazon Linux (dnf or yum)."
  exit 1
fi

sudo "$PACKAGE_MANAGER" update -y
sudo "$PACKAGE_MANAGER" install -y ca-certificates curl git nginx

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL "https://rpm.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo "$PACKAGE_MANAGER" install -y nodejs
fi

node -v
npm -v

# A t2.micro has only 1 GiB RAM. Next.js production builds can exceed that.
if ! swapon --show=NAME --noheadings | grep -q .; then
  echo "==> Creating ${SWAP_SIZE_MB} MB swap file for builds"
  sudo dd if=/dev/zero of=/swapfile bs=1M count="$SWAP_SIZE_MB" status=progress
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab >/dev/null
fi

if ! id "$APP_USER" >/dev/null 2>&1; then
  echo "==> Creating system user $APP_USER"
  sudo useradd --system --create-home --shell /usr/sbin/nologin "$APP_USER"
fi

echo "==> Creating app directories"
sudo mkdir -p "$APP_DIR/public/uploads/blogs" "$APP_DIR/prisma"
sudo chown -R "$APP_USER:$APP_USER" "$APP_ROOT"

if [ ! -d "$APP_ROOT/.git" ]; then
  echo "==> Cloning repository into $APP_ROOT"
  sudo -u "$APP_USER" git clone --branch "$GIT_REF" "$REPO_URL" "$APP_ROOT"
else
  echo "==> Repo already present at $APP_ROOT"
fi

cd "$APP_DIR"

if [ ! -f .env ]; then
  echo "==> Creating .env from .env.example (EDIT BEFORE GOING LIVE)"
  sudo -u "$APP_USER" cp .env.example .env
  # SQLite URLs are resolved relative to prisma/schema.prisma.
  sudo -u "$APP_USER" sed -i 's|^DATABASE_URL=.*|DATABASE_URL="file:./prod.db"|' .env
  echo "Edit $APP_DIR/.env now: AUTH_SECRET, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL, etc."
fi
sudo chown "$APP_USER:$APP_USER" .env
sudo chmod 640 .env

echo "==> Installing dependencies, migrating, and building"
sudo -u "$APP_USER" env HOME="/home/$APP_USER" bash -c "
  set -euo pipefail
  cd '$APP_DIR'
  mkdir -p \"\$HOME/.npm\"
  npm ci --cache \"\$HOME/.npm\"
  npx prisma migrate deploy
  npx prisma db seed || true
  npm run build
"

SERVICE_SRC="$APP_DIR/deploy/portfolio-new.service"
if [ -f "$SERVICE_SRC" ]; then
  echo "==> Installing systemd unit"
  sed \
    -e "s|/var/www/portfolio/new|$APP_DIR|g" \
    -e "s|User=portfolio|User=$APP_USER|g" \
    -e "s|Group=portfolio|Group=$APP_USER|g" \
    "$SERVICE_SRC" | sudo tee /etc/systemd/system/portfolio-new.service >/dev/null
  sudo systemctl daemon-reload
  sudo systemctl enable --now portfolio-new
  sudo systemctl --no-pager --full status portfolio-new || true
else
  echo "Missing $SERVICE_SRC - start manually with: sudo -u $APP_USER bash -lc 'cd $APP_DIR && npm start'"
fi

NGINX_SRC="$APP_DIR/deploy/nginx-portfolio.conf"
if [ -f "$NGINX_SRC" ]; then
  echo "==> Installing nginx reverse proxy"
  sudo cp "$NGINX_SRC" /etc/nginx/conf.d/portfolio.conf
  sudo nginx -t
  sudo systemctl enable --now nginx
  sudo systemctl reload nginx
fi

# Allow the user who runs this script (and typically GitHub Actions SSH) to restart the app
# without a password. Adjust DEPLOY_SSH_USER if Actions uses a different account.
DEPLOY_SSH_USER="${DEPLOY_SSH_USER:-$USER}"
if [ "$DEPLOY_SSH_USER" != "root" ] && id "$DEPLOY_SSH_USER" >/dev/null 2>&1; then
  echo "==> Allowing $DEPLOY_SSH_USER to restart portfolio-new via sudo"
  SYSTEMCTL_PATH="$(command -v systemctl)"
  echo "$DEPLOY_SSH_USER ALL=(root) NOPASSWD: $SYSTEMCTL_PATH restart portfolio-new, $SYSTEMCTL_PATH status portfolio-new, $SYSTEMCTL_PATH is-active portfolio-new" \
    | sudo tee "/etc/sudoers.d/portfolio-new-$DEPLOY_SSH_USER" >/dev/null
  sudo chmod 440 "/etc/sudoers.d/portfolio-new-$DEPLOY_SSH_USER"

  # Let the deploy SSH user update the git tree / build as $APP_USER via shared group
  sudo usermod -aG "$APP_USER" "$DEPLOY_SSH_USER" || true
  sudo chmod -R g+rwX "$APP_ROOT"
  sudo find "$APP_ROOT" -type d -exec chmod g+s {} \;
fi

echo ""
echo "Setup complete."
echo "Next:"
echo "  1. Edit $APP_DIR/.env (AUTH_SECRET >= 32 chars, strong ADMIN_PASSWORD)"
echo "  2. Install deploy/nginx-portfolio.conf as /etc/nginx/conf.d/portfolio.conf"
echo "  3. In the EC2 security group, allow 80/443 publicly and SSH only from trusted IPs"
echo "  4. Point DNS to an Elastic IP, then configure TLS with certbot"
echo "  5. Add EC2 GitHub Actions secrets and run workflow 'Deploy new (AWS EC2)'"
