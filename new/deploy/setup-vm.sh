#!/usr/bin/env bash
# One-time setup for an AWS EC2 Amazon Linux instance hosting the /new app.
# Run as the EC2 SSH user after ~/new has been uploaded by the workflow.
#
# Usage:
#   bash ~/new/deploy/setup-vm.sh
#
set -euo pipefail

APP_USER="${APP_USER:-$USER}"
APP_HOME="${APP_HOME:-$HOME}"
APP_DIR="${APP_DIR:-$APP_HOME/new}"
ENV_FILE="${ENV_FILE:-$APP_HOME/.env}"
NODE_MAJOR="${NODE_MAJOR:-20}"
SWAP_SIZE_MB="${SWAP_SIZE_MB:-2048}"

if [ ! -f "$APP_DIR/package.json" ]; then
  echo "Missing $APP_DIR/package.json."
  echo "Run the GitHub deployment once to upload new/, then run this setup script."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing production environment file at $ENV_FILE."
  exit 1
fi

echo "==> Installing Node.js ${NODE_MAJOR}.x"
if command -v dnf >/dev/null 2>&1; then
  PACKAGE_MANAGER=dnf
elif command -v yum >/dev/null 2>&1; then
  PACKAGE_MANAGER=yum
else
  echo "This script supports Amazon Linux (dnf or yum)."
  exit 1
fi

sudo "$PACKAGE_MANAGER" update -y
sudo "$PACKAGE_MANAGER" install -y ca-certificates curl

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

echo "==> Creating app directories"
mkdir -p "$APP_DIR/public/uploads/blogs" "$APP_DIR/prisma"
sudo chown -R "$APP_USER:$APP_USER" "$APP_DIR"

cd "$APP_DIR"
ln -sfn "$ENV_FILE" .env
chmod 600 "$ENV_FILE"

echo "==> Installing dependencies, migrating, and building"
sudo -u "$APP_USER" env HOME="$APP_HOME" bash -c "
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
    -e "s|/home/ec2-user/new|$APP_DIR|g" \
    -e "s|/home/ec2-user/.env|$ENV_FILE|g" \
    -e "s|User=ec2-user|User=$APP_USER|g" \
    -e "s|Group=ec2-user|Group=$APP_USER|g" \
    "$SERVICE_SRC" | sudo tee /etc/systemd/system/portfolio-new.service >/dev/null
  sudo systemctl daemon-reload
  sudo systemctl enable --now portfolio-new
  sudo systemctl --no-pager --full status portfolio-new || true
else
  echo "Missing $SERVICE_SRC - start manually with: sudo -u $APP_USER bash -lc 'cd $APP_DIR && npm start'"
fi

echo "==> Checking website on 127.0.0.1:3001"
WEBSITE_READY=false
for _ in {1..15}; do
  if curl --fail --silent --show-error http://127.0.0.1:3001/ >/dev/null; then
    WEBSITE_READY=true
    break
  fi
  sleep 2
done
if [ "$WEBSITE_READY" != "true" ]; then
  echo "Website did not become ready on port 3001."
  exit 1
fi

# Allow the user who runs this script (and typically GitHub Actions SSH) to restart the app
# without a password.
DEPLOY_SSH_USER="${DEPLOY_SSH_USER:-$USER}"
if [ "$DEPLOY_SSH_USER" != "root" ] && id "$DEPLOY_SSH_USER" >/dev/null 2>&1; then
  echo "==> Allowing $DEPLOY_SSH_USER to restart portfolio-new via sudo"
  SYSTEMCTL_PATH="$(command -v systemctl)"
  echo "$DEPLOY_SSH_USER ALL=(root) NOPASSWD: $SYSTEMCTL_PATH start portfolio-new, $SYSTEMCTL_PATH stop portfolio-new, $SYSTEMCTL_PATH restart portfolio-new, $SYSTEMCTL_PATH status portfolio-new, $SYSTEMCTL_PATH is-active portfolio-new" \
    | sudo tee "/etc/sudoers.d/portfolio-new-$DEPLOY_SSH_USER" >/dev/null
  sudo chmod 440 "/etc/sudoers.d/portfolio-new-$DEPLOY_SSH_USER"

fi

echo ""
echo "Setup complete."
echo "Next:"
echo "  1. Keep production values in $ENV_FILE; $APP_DIR/.env is a symlink"
echo "  2. Use DATABASE_URL=\"file:./prod.db\" for SQLite"
echo "  3. Run workflow 'Deploy website (AWS EC2)' for website releases"
echo "  4. Run workflow 'Configure nginx (AWS EC2)' separately for nginx and TLS"
