# My Brain doctor - Hostinger VPS Deployment Guide

## Prerequisites

Before deploying to Hostinger VPS, ensure you have:
- Hostinger VPS account with SSH access
- Domain name (optional, can use IP address)
- SSH client installed on your local machine

## Server Requirements

- **OS**: Ubuntu 20.04 or later
- **RAM**: Minimum 2GB (4GB recommended)
- **Node.js**: v18.x or later
- **PostgreSQL**: v14 or later
- **Nginx**: Latest stable version
- **PM2**: Process manager for Node.js

---

## Step 1: Prepare Your VPS

### 1.1 Connect to VPS via SSH

```bash
ssh root@your-vps-ip
# or
ssh username@your-vps-ip
```

### 1.2 Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.3 Install Node.js (v18.x)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v18.x
npm --version
```

### 1.4 Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 1.5 Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.6 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
pm2 startup
```

---

## Step 2: Set Up PostgreSQL Database

### 2.1 Create Database and User

```bash
sudo -u postgres psql
```

In PostgreSQL console:

```sql
-- Create database
CREATE DATABASE mybraindoctor;

-- Create user
CREATE USER mybraindoctor_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mybraindoctor TO mybraindoctor_user;

-- Exit
\q
```

### 2.2 Configure PostgreSQL for Remote Access (if needed)

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Find and change:
```
listen_addresses = 'localhost'
```

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add:
```
host    mybraindoctor    mybraindoctor_user    127.0.0.1/32    md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

---

## Step 3: Upload Project to VPS

### 3.1 Create Application Directory

```bash
sudo mkdir -p /var/www/mybraindoctor
sudo chown -R $USER:$USER /var/www/mybraindoctor
cd /var/www/mybraindoctor
```

### 3.2 Option A: Upload via Git (Recommended)

```bash
# Initialize git repository locally (on your machine)
cd /Users/hariprasanthmadhavan/Motivator
git init
git add .
git commit -m "Initial commit for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/mybraindoctor.git
git push -u origin main

# On VPS, clone the repository
cd /var/www/mybraindoctor
git clone https://github.com/yourusername/mybraindoctor.git .
```

### 3.2 Option B: Upload via SCP

On your local machine:

```bash
cd /Users/hariprasanthmadhavan/Motivator
tar -czf mybraindoctor.tar.gz .
scp mybraindoctor.tar.gz root@your-vps-ip:/var/www/mybraindoctor/

# On VPS, extract
cd /var/www/mybraindoctor
tar -xzf mybraindoctor.tar.gz
rm mybraindoctor.tar.gz
```

---

## Step 4: Configure Environment Variables

```bash
cd /var/www/mybraindoctor
nano .env.production
```

Add the following (replace with your actual values):

```env
# Database
DATABASE_URL="postgresql://mybraindoctor_user:your_secure_password_here@localhost:5432/mybraindoctor"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"
OPENAI_MODEL="gpt-4"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key-here"
EMAIL_FROM="My Brain doctor <noreply@yourdomain.com>"

# App Config
APP_ENV="production"
NODE_ENV="production"
PORT=3000
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Step 5: Install Dependencies and Build

```bash
cd /var/www/mybraindoctor

# Install dependencies
npm install --production=false

# Run Prisma migrations
npx prisma generate
npx prisma migrate deploy

# Build Next.js application
npm run build
```

---

## Step 6: Configure PM2

### 6.1 Create PM2 Ecosystem File

```bash
nano ecosystem.config.js
```

Add:

```javascript
module.exports = {
  apps: [{
    name: 'mybraindoctor',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/mybraindoctor',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/mybraindoctor/error.log',
    out_file: '/var/log/mybraindoctor/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

### 6.2 Create Log Directory

```bash
sudo mkdir -p /var/log/mybraindoctor
sudo chown -R $USER:$USER /var/log/mybraindoctor
```

### 6.3 Start Application with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6.4 Useful PM2 Commands

```bash
pm2 status              # Check app status
pm2 logs mybraindoctor  # View logs
pm2 restart mybraindoctor  # Restart app
pm2 stop mybraindoctor  # Stop app
pm2 delete mybraindoctor  # Delete app from PM2
pm2 monit               # Monitor resources
```

---

## Step 7: Configure Nginx as Reverse Proxy

### 7.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/mybraindoctor
```

Add:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # Or use IP: server_name your-vps-ip;

    # Redirect to HTTPS (after SSL is set up)
    # return 301 https://$server_name$request_uri;

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
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

### 7.2 Enable Site and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/mybraindoctor /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## Step 8: Set Up SSL Certificate (Optional but Recommended)

### 8.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically configure Nginx for HTTPS.

### 8.3 Auto-Renewal

```bash
sudo certbot renew --dry-run
```

Certbot sets up auto-renewal by default via cron.

---

## Step 9: Configure Firewall

### 9.1 Install UFW (if not installed)

```bash
sudo apt install ufw -y
```

### 9.2 Configure Firewall Rules

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Step 10: Final Checks

### 10.1 Verify Application is Running

```bash
pm2 status
curl http://localhost:3000  # Should return HTML
```

### 10.2 Check Nginx

```bash
sudo systemctl status nginx
```

### 10.3 Test External Access

Open browser and visit:
- `http://yourdomain.com` (or `http://your-vps-ip`)
- `https://yourdomain.com` (if SSL configured)

---

## Updating the Application

### Method 1: Using Git

```bash
cd /var/www/mybraindoctor
git pull origin main
npm install
npm run build
npx prisma migrate deploy
pm2 restart mybraindoctor
```

### Method 2: Manual Upload

```bash
# On local machine
tar -czf mybraindoctor-update.tar.gz .
scp mybraindoctor-update.tar.gz root@your-vps-ip:/tmp/

# On VPS
cd /var/www/mybraindoctor
tar -xzf /tmp/mybraindoctor-update.tar.gz
npm install
npm run build
npx prisma migrate deploy
pm2 restart mybraindoctor
```

---

## Monitoring and Maintenance

### View Application Logs

```bash
pm2 logs mybraindoctor
tail -f /var/log/mybraindoctor/error.log
tail -f /var/log/mybraindoctor/out.log
```

### View Nginx Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backup

```bash
# Create backup script
nano ~/backup-db.sh
```

Add:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mybraindoctor"
mkdir -p $BACKUP_DIR
pg_dump -U mybraindoctor_user mybraindoctor > $BACKUP_DIR/backup_$DATE.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

Make executable and schedule:

```bash
chmod +x ~/backup-db.sh
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

---

## Troubleshooting

### Application Not Starting

```bash
pm2 logs mybraindoctor  # Check error logs
pm2 restart mybraindoctor
```

### Database Connection Issues

```bash
# Test database connection
psql -U mybraindoctor_user -d mybraindoctor -h localhost
# Check DATABASE_URL in .env.production
```

### Nginx 502 Bad Gateway

```bash
# Check if app is running
pm2 status
# Check Nginx configuration
sudo nginx -t
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Port Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill process if needed
sudo kill -9 <PID>
```

---

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords** for database and environment variables

3. **Disable root SSH login**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

4. **Set up SSH key authentication** instead of passwords

5. **Regular backups** of database and application files

6. **Monitor logs** regularly for suspicious activity

7. **Use HTTPS** (SSL certificate) for all traffic

8. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Performance Optimization

### Enable Gzip Compression in Nginx

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside `http` block:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## Support and Resources

- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment
- **PM2 Documentation**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx Documentation**: https://nginx.org/en/docs/

---

**Deployment Checklist:**

- [ ] VPS provisioned and accessible via SSH
- [ ] Node.js, PostgreSQL, Nginx installed
- [ ] PostgreSQL database and user created
- [ ] Application uploaded to VPS
- [ ] Environment variables configured (.env.production)
- [ ] Dependencies installed
- [ ] Database migrations run
- [ ] Application built (npm run build)
- [ ] PM2 configured and application started
- [ ] Nginx configured as reverse proxy
- [ ] SSL certificate installed (optional but recommended)
- [ ] Firewall configured
- [ ] Application accessible via domain/IP
- [ ] Backup strategy implemented
- [ ] Monitoring set up

**Your My Brain doctor application is now live! 🚀**
