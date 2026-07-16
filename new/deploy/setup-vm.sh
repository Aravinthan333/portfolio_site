#!/usr/bin/env bash
# One-time setup for an Ubuntu GCE VM that will host the /new Next.js app.
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

if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 <git-repo-url> [ref]"
  echo "Example: $0 https://github.com/Aravinthan333/portfolio_site.git main"
  exit 1
fi

echo "==> Installing Node.js ${NODE_MAJOR}.x and git"
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg git

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
fi

node -v
npm -v

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
  sudo -u "$APP_USER" sed -i 's|^DATABASE_URL=.*|DATABASE_URL="file:./prisma/prod.db"|' .env
  echo "Edit $APP_DIR/.env now: AUTH_SECRET, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL, etc."
fi

echo "==> Installing deps, migrating, building"
sudo -u "$APP_USER" bash -lc "
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

# Allow the user who runs this script (and typically GitHub Actions SSH) to restart the app
# without a password. Adjust DEPLOY_SSH_USER if Actions uses a different account.
DEPLOY_SSH_USER="${DEPLOY_SSH_USER:-$USER}"
if [ "$DEPLOY_SSH_USER" != "root" ] && id "$DEPLOY_SSH_USER" >/dev/null 2>&1; then
  echo "==> Allowing $DEPLOY_SSH_USER to restart portfolio-new via sudo"
  echo "$DEPLOY_SSH_USER ALL=(root) NOPASSWD: /bin/systemctl restart portfolio-new, /bin/systemctl status portfolio-new, /bin/systemctl is-active portfolio-new" \
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
echo "  2. Grant the GitHub Actions SA permission to SSH to this VM (OS Login or SSH keys)"
echo "  3. Open firewall for 80/443; keep 3001 bound to localhost behind nginx"
echo "  4. Install nginx config from deploy/nginx-portfolio.conf + certbot"
echo "  5. Add GitHub Actions secrets and run workflow 'Deploy new (GCP)'"
