#!/bin/bash

# My Brain doctor - Quick Deployment Script for Hostinger VPS
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 My Brain doctor - VPS Deployment Script"
echo "==========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="mybraindoctor"
APP_DIR="/var/www/${APP_NAME}"
LOG_DIR="/var/log/${APP_NAME}"

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    print_error "Please run with sudo or as root"
    exit 1
fi

# Step 1: Update system packages
echo ""
echo "Step 1: Updating system packages..."
apt update && apt upgrade -y
print_success "System packages updated"

# Step 2: Install Node.js
echo ""
echo "Step 2: Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
    print_success "Node.js installed: $(node --version)"
else
    print_success "Node.js already installed: $(node --version)"
fi

# Step 3: Install PostgreSQL
echo ""
echo "Step 3: Installing PostgreSQL..."
if ! command -v psql &> /dev/null; then
    apt install postgresql postgresql-contrib -y
    systemctl start postgresql
    systemctl enable postgresql
    print_success "PostgreSQL installed"
else
    print_success "PostgreSQL already installed"
fi

# Step 4: Install Nginx
echo ""
echo "Step 4: Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    systemctl start nginx
    systemctl enable nginx
    print_success "Nginx installed"
else
    print_success "Nginx already installed"
fi

# Step 5: Install PM2
echo ""
echo "Step 5: Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    print_success "PM2 installed"
else
    print_success "PM2 already installed"
fi

# Step 6: Create application directory
echo ""
echo "Step 6: Creating application directory..."
mkdir -p ${APP_DIR}
mkdir -p ${LOG_DIR}
print_success "Directories created"

# Step 7: Create database
echo ""
echo "Step 7: Setting up PostgreSQL database..."
read -p "Enter database password for ${APP_NAME}_user: " DB_PASSWORD
sudo -u postgres psql <<EOF
CREATE DATABASE ${APP_NAME};
CREATE USER ${APP_NAME}_user WITH PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE ${APP_NAME} TO ${APP_NAME}_user;
ALTER DATABASE ${APP_NAME} OWNER TO ${APP_NAME}_user;
EOF
print_success "Database created"

# Step 8: Configure firewall
echo ""
echo "Step 8: Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow OpenSSH
    ufw allow 'Nginx Full'
    echo "y" | ufw enable
    print_success "Firewall configured"
else
    print_warning "UFW not installed, skipping firewall configuration"
fi

# Step 9: Instructions for next steps
echo ""
echo "==========================================="
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Upload your application code to: ${APP_DIR}"
echo "   - Using Git: git clone <your-repo-url> ${APP_DIR}"
echo "   - Using SCP: scp -r /local/path/* root@server:${APP_DIR}/"
echo ""
echo "2. Create .env.production file at: ${APP_DIR}/.env.production"
echo "   DATABASE_URL=\"postgresql://${APP_NAME}_user:${DB_PASSWORD}@localhost:5432/${APP_NAME}\""
echo ""
echo "3. Install dependencies and build:"
echo "   cd ${APP_DIR}"
echo "   npm install"
echo "   npx prisma generate"
echo "   npx prisma migrate deploy"
echo "   npm run build"
echo ""
echo "4. Start with PM2:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo "5. Configure Nginx:"
echo "   cp ${APP_DIR}/nginx.conf /etc/nginx/sites-available/${APP_NAME}"
echo "   ln -s /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/"
echo "   nginx -t"
echo "   systemctl restart nginx"
echo ""
echo "6. Set up SSL (optional):"
echo "   apt install certbot python3-certbot-nginx -y"
echo "   certbot --nginx -d yourdomain.com"
echo ""
echo "==========================================="
echo ""
print_success "Setup complete! Follow the next steps to deploy your application."
