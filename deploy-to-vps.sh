#!/bin/bash

##############################################################################
# Deployment Script for My Brain Doctor
# Deploy from GitHub to VPS Server
##############################################################################

set -e  # Exit on error

# Configuration
VPS_HOST="srv1170713"
VPS_USER="root"
GITHUB_REPO="https://github.com/iamhariprasanth/Motivator.git"
DEPLOY_DIR="/var/www/mybraindoctor"
APP_NAME="my-brain-doctor"

echo "🚀 Deploying My Brain Doctor to VPS..."
echo "================================================"

# Step 1: Connect to VPS and clone/update repository
echo "📦 Step 1: Cloning repository from GitHub..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e

    DEPLOY_DIR="/var/www/mybraindoctor"
    GITHUB_REPO="https://github.com/iamhariprasanth/Motivator.git"

    # Create deployment directory if it doesn't exist
    if [ ! -d "$DEPLOY_DIR" ]; then
        echo "Creating deployment directory: $DEPLOY_DIR"
        mkdir -p $DEPLOY_DIR
        cd $DEPLOY_DIR/..
        git clone $GITHUB_REPO mybraindoctor
    else
        echo "Updating existing repository..."
        cd $DEPLOY_DIR
        git fetch origin
        git reset --hard origin/main
        git pull origin main
    fi

    cd $DEPLOY_DIR
    echo "✅ Repository cloned/updated successfully"
    echo "Current commit: $(git log -1 --oneline)"
ENDSSH

# Step 2: Install dependencies
echo ""
echo "📚 Step 2: Installing dependencies..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd /var/www/mybraindoctor

    # Install Node.js if not already installed
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi

    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"

    echo "Installing npm packages..."
    npm install

    echo "✅ Dependencies installed"
ENDSSH

# Step 3: Set up environment variables
echo ""
echo "⚙️  Step 3: Checking environment variables..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd /var/www/mybraindoctor

    if [ ! -f ".env" ]; then
        echo "Creating .env file from .env.example..."
        cp .env.example .env
        echo ""
        echo "⚠️  IMPORTANT: You need to configure .env file with:"
        echo "   - DATABASE_URL"
        echo "   - NEXTAUTH_SECRET (run: openssl rand -base64 32)"
        echo "   - OPENAI_API_KEY"
        echo "   - RESEND_API_KEY"
        echo "   - EMAIL_FROM"
        echo ""
        echo "Edit .env file: nano /var/www/mybraindoctor/.env"
    else
        echo "✅ .env file already exists"
    fi
ENDSSH

# Step 4: Set up PostgreSQL database
echo ""
echo "🗄️  Step 4: Setting up PostgreSQL database..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd /var/www/mybraindoctor

    # Install PostgreSQL if not installed
    if ! command -v psql &> /dev/null; then
        echo "Installing PostgreSQL..."
        apt-get update
        apt-get install -y postgresql postgresql-contrib
        systemctl start postgresql
        systemctl enable postgresql
    fi

    echo "✅ PostgreSQL is ready"
    echo "Run Prisma migrations: cd /var/www/mybraindoctor && npx prisma migrate deploy"
ENDSSH

# Step 5: Build the application
echo ""
echo "🔨 Step 5: Building application..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd /var/www/mybraindoctor

    echo "Generating Prisma client..."
    npx prisma generate

    echo "Building Next.js application..."
    npm run build

    echo "✅ Build completed successfully"
ENDSSH

# Step 6: Set up PM2 and start application
echo ""
echo "🚦 Step 6: Starting application with PM2..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd /var/www/mybraindoctor

    # Install PM2 if not installed
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2..."
        npm install -g pm2
    fi

    # Stop existing instance if running
    pm2 delete my-brain-doctor 2>/dev/null || true

    # Start application
    echo "Starting application..."
    pm2 start npm --name "my-brain-doctor" -- start

    # Save PM2 configuration
    pm2 save

    # Set up PM2 to start on boot
    pm2 startup systemd -u root --hp /root

    echo "✅ Application started successfully"
    pm2 status
ENDSSH

# Step 7: Set up Nginx reverse proxy
echo ""
echo "🌐 Step 7: Setting up Nginx..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e

    # Install Nginx if not installed
    if ! command -v nginx &> /dev/null; then
        echo "Installing Nginx..."
        apt-get update
        apt-get install -y nginx
    fi

    # Create Nginx configuration
    cat > /etc/nginx/sites-available/mybraindoctor << 'NGINX_CONF'
server {
    listen 80;
    server_name srv1170713 localhost;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX_CONF

    # Enable site
    ln -sf /etc/nginx/sites-available/mybraindoctor /etc/nginx/sites-enabled/

    # Test Nginx configuration
    nginx -t

    # Reload Nginx
    systemctl reload nginx
    systemctl enable nginx

    echo "✅ Nginx configured and running"
ENDSSH

echo ""
echo "================================================"
echo "✅ Deployment Complete!"
echo "================================================"
echo ""
echo "Your application is now running at:"
echo "  http://srv1170713"
echo ""
echo "Next steps:"
echo "  1. Configure .env file on server:"
echo "     ssh root@srv1170713 'nano /var/www/mybraindoctor/.env'"
echo ""
echo "  2. Run database migrations:"
echo "     ssh root@srv1170713 'cd /var/www/mybraindoctor && npx prisma migrate deploy'"
echo ""
echo "  3. Restart application:"
echo "     ssh root@srv1170713 'pm2 restart my-brain-doctor'"
echo ""
echo "  4. Check application status:"
echo "     ssh root@srv1170713 'pm2 status'"
echo "     ssh root@srv1170713 'pm2 logs my-brain-doctor'"
echo ""
echo "  5. (Optional) Set up SSL with Let's Encrypt:"
echo "     ssh root@srv1170713 'apt-get install certbot python3-certbot-nginx'"
echo "     ssh root@srv1170713 'certbot --nginx -d yourdomain.com'"
echo ""
