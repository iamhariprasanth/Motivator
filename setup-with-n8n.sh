#!/bin/bash

##############################################################################
# Setup My Brain Doctor alongside n8n on VPS
# This script configures both apps to run on the same server
##############################################################################

set -e

echo "🚀 Setting up My Brain Doctor (alongside n8n)..."
echo "================================================"

# Step 1: Check what's running on common ports
echo "1. Checking port usage..."
echo ""
echo "Port 80 (HTTP):"
netstat -tulpn | grep :80 || echo "  Not in use"
echo ""
echo "Port 3000:"
netstat -tulpn | grep :3000 || echo "  Not in use"
echo ""
echo "Port 5678 (n8n):"
netstat -tulpn | grep :5678 || echo "  Not in use"
echo ""

# Step 2: Navigate to app directory
echo "2. Navigating to application directory..."
cd /var/www/mybraindoctor

# Step 3: Pull latest code
echo "3. Pulling latest code from GitHub..."
git pull origin main

# Step 4: Install dependencies
echo "4. Installing dependencies..."
npm install

# Step 5: Check/Setup environment variables
echo "5. Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << 'ENV_FILE'
# Database
DATABASE_URL="postgresql://mybraindoctor_user:changeme123@localhost:5432/mybraindoctor"

# NextAuth
NEXTAUTH_URL="https://mybraindoctor.online"
NEXTAUTH_SECRET=""

# OpenAI
OPENAI_API_KEY=""

# Email (Optional)
RESEND_API_KEY=""
EMAIL_FROM="My Brain doctor <noreply@mybraindoctor.online>"

# App Config
APP_ENV="production"
NODE_ENV="production"

# IMPORTANT: Port 3001 (to avoid conflict with n8n)
PORT=3001
ENV_FILE

    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your credentials:"
    echo "   nano /var/www/mybraindoctor/.env"
    echo ""
    echo "Required:"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - OPENAI_API_KEY (get from OpenAI dashboard)"
    echo ""
else
    echo "✅ .env file exists"
    # Add PORT=3001 if not present
    if ! grep -q "PORT=" .env; then
        echo "PORT=3001" >> .env
        echo "✅ Added PORT=3001 to .env"
    fi
fi

# Step 6: Setup PostgreSQL database
echo ""
echo "6. Setting up PostgreSQL database..."
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw mybraindoctor; then
    echo "✅ Database 'mybraindoctor' already exists"
else
    echo "Creating database..."
    sudo -u postgres psql << 'EOSQL'
CREATE DATABASE mybraindoctor;
CREATE USER mybraindoctor_user WITH PASSWORD 'changeme123';
GRANT ALL PRIVILEGES ON DATABASE mybraindoctor TO mybraindoctor_user;
ALTER DATABASE mybraindoctor OWNER TO mybraindoctor_user;
\q
EOSQL
    echo "✅ Database created"
fi

# Step 7: Run Prisma migrations
echo ""
echo "7. Running database migrations..."
npx prisma generate
npx prisma migrate deploy || echo "⚠️  Migrations failed - check DATABASE_URL in .env"

# Step 8: Build the application
echo ""
echo "8. Building Next.js application..."
npm run build

# Step 9: Setup PM2 with custom port
echo ""
echo "9. Setting up PM2 to run on port 3001..."

# Stop existing instance
pm2 delete my-brain-doctor 2>/dev/null || true

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'ECOSYSTEM'
module.exports = {
  apps: [{
    name: 'my-brain-doctor',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '500M',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
ECOSYSTEM

# Create logs directory
mkdir -p logs

# Start with ecosystem file
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup systemd -u root --hp /root || echo "PM2 startup already configured"

echo "✅ Application started on port 3001"
pm2 status

# Step 10: Configure Nginx
echo ""
echo "10. Configuring Nginx..."

# Backup existing Nginx config if it exists
if [ -f /etc/nginx/sites-available/mybraindoctor ]; then
    cp /etc/nginx/sites-available/mybraindoctor /etc/nginx/sites-available/mybraindoctor.backup
fi

# Create new Nginx configuration
cat > /etc/nginx/sites-available/mybraindoctor << 'NGINX_CONF'
# My Brain Doctor - Main domain
server {
    listen 80;
    server_name mybraindoctor.online www.mybraindoctor.online;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

# Enable site
ln -sf /etc/nginx/sites-available/mybraindoctor /etc/nginx/sites-enabled/

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

# Reload Nginx
echo "Reloading Nginx..."
systemctl reload nginx 2>/dev/null || systemctl start nginx

echo "✅ Nginx configured"

# Step 11: Final checks
echo ""
echo "11. Running final checks..."
echo ""

echo "Checking if app responds on port 3001:"
sleep 3
curl -s http://localhost:3001 > /dev/null && echo "✅ App running on port 3001" || echo "❌ App not responding on port 3001"

echo ""
echo "Checking if Nginx proxy works:"
curl -s -H "Host: mybraindoctor.online" http://localhost > /dev/null && echo "✅ Nginx proxy working" || echo "❌ Nginx proxy not working"

echo ""
echo "================================================"
echo "✅ Setup Complete!"
echo "================================================"
echo ""
echo "Your applications:"
echo "  • My Brain Doctor: http://mybraindoctor.online (port 3001)"
echo "  • n8n: Check your existing n8n setup (likely port 5678 or 3000)"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit environment variables:"
echo "   nano /var/www/mybraindoctor/.env"
echo ""
echo "2. Add your API keys:"
echo "   - NEXTAUTH_SECRET (run: openssl rand -base64 32)"
echo "   - OPENAI_API_KEY"
echo ""
echo "3. Restart the app:"
echo "   cd /var/www/mybraindoctor && pm2 restart my-brain-doctor"
echo ""
echo "4. View logs:"
echo "   pm2 logs my-brain-doctor"
echo ""
echo "5. Setup SSL (recommended):"
echo "   apt-get install certbot python3-certbot-nginx"
echo "   certbot --nginx -d mybraindoctor.online -d www.mybraindoctor.online"
echo ""
