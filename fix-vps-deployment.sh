#!/bin/bash

##############################################################################
# Fix VPS Deployment - Diagnose and Fix Common Issues
##############################################################################

set -e

echo "🔍 Diagnosing My Brain Doctor Deployment..."
echo "================================================"

cd /var/www/mybraindoctor

# Check if .env exists
echo "1. Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  CRITICAL: You must edit .env file with your values:"
    echo "   nano /var/www/mybraindoctor/.env"
    echo ""
    echo "Required variables:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - NEXTAUTH_URL=https://mybraindoctor.online"
    echo "   - OPENAI_API_KEY"
    exit 1
else
    echo "✅ .env file exists"
    echo ""
    echo "Checking required environment variables..."

    # Check for required variables
    if ! grep -q "DATABASE_URL=" .env || grep -q "DATABASE_URL=\"\"" .env; then
        echo "❌ DATABASE_URL not configured in .env"
    else
        echo "✅ DATABASE_URL configured"
    fi

    if ! grep -q "OPENAI_API_KEY=" .env || grep -q "OPENAI_API_KEY=\"\"" .env; then
        echo "❌ OPENAI_API_KEY not configured in .env"
    else
        echo "✅ OPENAI_API_KEY configured"
    fi

    if ! grep -q "NEXTAUTH_SECRET=" .env || grep -q "NEXTAUTH_SECRET=\"\"" .env; then
        echo "❌ NEXTAUTH_SECRET not configured in .env"
        echo "Generate one with: openssl rand -base64 32"
    else
        echo "✅ NEXTAUTH_SECRET configured"
    fi
fi

echo ""
echo "2. Checking PostgreSQL database..."
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw mybraindoctor; then
    echo "✅ Database 'mybraindoctor' exists"
else
    echo "❌ Database 'mybraindoctor' does not exist"
    echo ""
    echo "Creating database..."
    sudo -u postgres psql << EOF
CREATE DATABASE mybraindoctor;
CREATE USER mybraindoctor_user WITH PASSWORD 'changeme123';
GRANT ALL PRIVILEGES ON DATABASE mybraindoctor TO mybraindoctor_user;
ALTER DATABASE mybraindoctor OWNER TO mybraindoctor_user;
EOF
    echo "✅ Database created"
    echo "⚠️  Update DATABASE_URL in .env with: postgresql://mybraindoctor_user:changeme123@localhost:5432/mybraindoctor"
fi

echo ""
echo "3. Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy || {
    echo "⚠️  Migrations failed. Check your DATABASE_URL in .env"
}

echo ""
echo "4. Rebuilding application..."
npm run build

echo ""
echo "5. Restarting PM2 application..."
pm2 delete my-brain-doctor 2>/dev/null || true
pm2 start npm --name "my-brain-doctor" -- start
pm2 save

echo ""
echo "6. Checking application status..."
sleep 3
pm2 status

echo ""
echo "7. Testing application endpoints..."
echo "Testing localhost:3000..."
curl -s http://localhost:3000 > /dev/null && echo "✅ App responds on port 3000" || echo "❌ App not responding on port 3000"

echo ""
echo "Testing through Nginx..."
curl -s http://localhost > /dev/null && echo "✅ Nginx proxy working" || echo "❌ Nginx proxy not working"

echo ""
echo "================================================"
echo "🔍 Diagnostic Complete"
echo "================================================"
echo ""
echo "View application logs with:"
echo "  pm2 logs my-brain-doctor"
echo ""
echo "View last 50 lines:"
echo "  pm2 logs my-brain-doctor --lines 50"
echo ""
echo "View Nginx error logs:"
echo "  tail -f /var/log/nginx/error.log"
echo ""
