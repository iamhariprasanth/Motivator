# VPS Diagnostic Commands

Run these commands on your VPS to fix the 404 error:

```bash
# 1. Check if PM2 is running the application
pm2 status

# 2. Check PM2 logs to see errors
pm2 logs my-brain-doctor --lines 50

# 3. Check if the app directory exists
ls -la /var/www/mybraindoctor

# 4. Go to the app directory
cd /var/www/mybraindoctor

# 5. Check if .env file exists and has values
cat .env

# 6. Check if the build directory exists
ls -la .next

# 7. Test if port 3000 is listening
netstat -tulpn | grep 3000

# 8. Try to access the app directly
curl http://localhost:3000

# 9. Check Nginx configuration
nginx -t

# 10. Check Nginx error logs
tail -n 50 /var/log/nginx/error.log
```

## Quick Fix (Run these in order):

```bash
# Go to app directory
cd /var/www/mybraindoctor

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Check/create .env file
if [ ! -f .env ]; then
  cp .env.example .env
  echo "⚠️  Edit .env file: nano .env"
else
  echo "✅ .env exists"
fi

# Build the application
npm run build

# Restart PM2
pm2 restart my-brain-doctor || pm2 start npm --name "my-brain-doctor" -- start

# Check status
pm2 status

# View logs
pm2 logs my-brain-doctor --lines 20
```
