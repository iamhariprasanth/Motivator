# VPS Deployment Guide - My Brain Doctor

**Server**: root@srv1170713
**GitHub Repository**: https://github.com/iamhariprasanth/Motivator.git

---

## Quick Deployment (Automated)

Run this command from your local machine:

```bash
./deploy-to-vps.sh
```

This script will automatically:
- Clone the repository from GitHub
- Install dependencies
- Build the application
- Set up PM2 process manager
- Configure Nginx reverse proxy
- Start the application

---

## Manual Deployment Steps

### Step 1: SSH to VPS

```bash
ssh root@srv1170713
```

### Step 2: Clone Repository

```bash
# Create directory
mkdir -p /var/www
cd /var/www

# Clone from GitHub
git clone https://github.com/iamhariprasanth/Motivator.git mybraindoctor
cd mybraindoctor
```

### Step 3: Install Node.js (if not installed)

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Install Dependencies

```bash
cd /var/www/mybraindoctor
npm install
```

### Step 5: Set Up Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env
```

**Required Environment Variables:**

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mybraindoctor"

# NextAuth
NEXTAUTH_URL="http://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-4"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="My Brain doctor <noreply@yourdomain.com>"

# App Config
APP_ENV="production"
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### Step 6: Set Up PostgreSQL Database

```bash
# Install PostgreSQL
apt-get update
apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE mybraindoctor;
CREATE USER mybraindoctor_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE mybraindoctor TO mybraindoctor_user;
\q
EOF
```

### Step 7: Run Database Migrations

```bash
cd /var/www/mybraindoctor

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

### Step 8: Build Application

```bash
cd /var/www/mybraindoctor
npm run build
```

### Step 9: Install and Configure PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "my-brain-doctor" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup systemd -u root --hp /root
# Run the command it outputs

# Check status
pm2 status
pm2 logs my-brain-doctor
```

### Step 10: Set Up Nginx Reverse Proxy

```bash
# Install Nginx
apt-get install -y nginx

# Create Nginx configuration
cat > /etc/nginx/sites-available/mybraindoctor << 'EOF'
server {
    listen 80;
    server_name srv1170713 yourdomain.com;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

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

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/mybraindoctor /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
systemctl enable nginx
```

### Step 11: Set Up SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal
certbot renew --dry-run
```

---

## Updating Deployment

When you push new code to GitHub:

```bash
# SSH to server
ssh root@srv1170713

# Navigate to directory
cd /var/www/mybraindoctor

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild application
npm run build

# Run any new migrations
npx prisma migrate deploy

# Restart application
pm2 restart my-brain-doctor

# Check status
pm2 logs my-brain-doctor --lines 50
```

---

## Monitoring & Maintenance

### Check Application Status

```bash
# PM2 status
pm2 status

# View logs
pm2 logs my-brain-doctor

# View last 100 lines
pm2 logs my-brain-doctor --lines 100

# Monitor in real-time
pm2 monit
```

### Check Nginx Status

```bash
# Status
systemctl status nginx

# Test configuration
nginx -t

# View logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Check Database

```bash
# Connect to database
sudo -u postgres psql mybraindoctor

# Check connections
SELECT * FROM pg_stat_activity WHERE datname = 'mybraindoctor';

# Database size
SELECT pg_size_pretty(pg_database_size('mybraindoctor'));
```

### Restart Services

```bash
# Restart application
pm2 restart my-brain-doctor

# Restart Nginx
systemctl restart nginx

# Restart PostgreSQL
systemctl restart postgresql
```

---

## Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs my-brain-doctor --err

# Check environment variables
cd /var/www/mybraindoctor
cat .env

# Test build
npm run build

# Check port 3000
netstat -tulpn | grep 3000
```

### Database connection errors

```bash
# Check PostgreSQL is running
systemctl status postgresql

# Test connection
sudo -u postgres psql -c "\l"

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Nginx errors

```bash
# Check configuration
nginx -t

# Check logs
tail -f /var/log/nginx/error.log

# Check if running
systemctl status nginx
```

### Port conflicts

```bash
# Check what's using port 3000
lsof -i :3000

# Check what's using port 80
lsof -i :80

# Kill process if needed
kill -9 <PID>
```

---

## Security Checklist

- [x] Security packages installed (DOMPurify, rate limiting)
- [x] CSRF protection middleware enabled
- [x] Security headers configured in Nginx
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Firewall configured (UFW)
- [ ] SSH key-based authentication only
- [ ] Database backups configured
- [ ] Log rotation set up
- [ ] Monitoring alerts configured

### Set Up Firewall (UFW)

```bash
# Install UFW
apt-get install -y ufw

# Allow SSH (IMPORTANT: do this first!)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

### Database Backups

```bash
# Create backup script
cat > /root/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump mybraindoctor | gzip > $BACKUP_DIR/mybraindoctor_$DATE.sql.gz
# Keep only last 7 days
find $BACKUP_DIR -name "mybraindoctor_*.sql.gz" -mtime +7 -delete
EOF

chmod +x /root/backup-db.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /root/backup-db.sh") | crontab -
```

---

## Performance Optimization

### Enable HTTP/2 in Nginx

```bash
# Edit Nginx config
nano /etc/nginx/sites-available/mybraindoctor

# Change to:
listen 443 ssl http2;
```

### Set Up Redis for Rate Limiting (Optional)

```bash
# Install Redis
apt-get install -y redis-server

# Start Redis
systemctl start redis-server
systemctl enable redis-server

# Update .env
echo "REDIS_URL=redis://localhost:6379" >> /var/www/mybraindoctor/.env

# Update src/lib/ratelimit.ts to use Upstash Redis
```

---

## Useful Commands

```bash
# View all running processes
pm2 list

# Restart all apps
pm2 restart all

# Stop application
pm2 stop my-brain-doctor

# Delete from PM2
pm2 delete my-brain-doctor

# Clear PM2 logs
pm2 flush

# Monitor resources
htop

# Check disk space
df -h

# Check memory
free -h
```

---

**Deployed**: Ready to deploy
**Next Review**: After first deployment
**Support**: https://github.com/iamhariprasanth/Motivator/issues
