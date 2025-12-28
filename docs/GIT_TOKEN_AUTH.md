# Using GitHub Personal Access Token on VPS

This guide shows you how to clone and pull from GitHub on your VPS using a Personal Access Token (PAT) for authentication.

---

## Why Use a Token?

GitHub no longer accepts passwords for Git operations. You need to use either:
1. **Personal Access Token (PAT)** - Easier, works immediately
2. SSH Keys - More secure, requires setup

This guide covers the PAT method.

---

## Step 1: Create a GitHub Personal Access Token

### 1.1 Go to GitHub Settings

1. Go to https://github.com/settings/tokens
2. Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

### 1.2 Generate New Token

1. Click **"Generate new token"** → **"Generate new token (classic)"**
2. Give it a name: `Hostinger VPS - My Brain Doctor`
3. Set expiration: **90 days** (or longer)
4. Select scopes:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **IMPORTANT**: Copy the token immediately (you won't see it again!)

Example token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Step 2: Clone Repository with Token

### Method 1: Direct Clone with Token in URL

```bash
# SSH to your VPS
ssh root@srv1170713

# Navigate to web directory
cd /var/www

# Clone using token (replace YOUR_TOKEN with your actual token)
git clone https://YOUR_TOKEN@github.com/iamhariprasanth/Motivator.git mybraindoctor

# Example:
# git clone https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/iamhariprasanth/Motivator.git mybraindoctor
```

### Method 2: Clone and Configure Token Later

```bash
# Clone normally (will ask for credentials)
git clone https://github.com/iamhariprasanth/Motivator.git mybraindoctor

# When prompted:
# Username: iamhariprasanth
# Password: YOUR_TOKEN (paste your token here, not your GitHub password!)
```

---

## Step 3: Save Token for Future Use (Git Credential Manager)

To avoid entering the token every time:

### Option A: Store Token in Git Config (Simple)

```bash
cd /var/www/mybraindoctor

# Store credentials (WARNING: stored in plain text)
git config credential.helper store

# Next time you pull, Git will ask for credentials once and save them
git pull

# Enter:
# Username: iamhariprasanth
# Password: YOUR_TOKEN
```

**Location**: Credentials saved in `~/.git-credentials`

### Option B: Cache Token Temporarily (More Secure)

```bash
# Cache credentials for 1 hour (3600 seconds)
git config --global credential.helper 'cache --timeout=3600'

# Or cache for 24 hours
git config --global credential.helper 'cache --timeout=86400'

# Next pull will ask for token, then cache it
git pull
```

### Option C: Update Remote URL with Token

```bash
cd /var/www/mybraindoctor

# Set remote URL with token embedded
git remote set-url origin https://YOUR_TOKEN@github.com/iamhariprasanth/Motivator.git

# Now you can pull without entering credentials
git pull origin main
```

---

## Step 4: Pull Latest Changes

After token is configured:

```bash
cd /var/www/mybraindoctor

# Pull latest changes
git pull origin main

# Or just
git pull
```

---

## Complete VPS Setup with Token

Here's the full workflow:

```bash
# 1. SSH to VPS
ssh root@srv1170713

# 2. Install Git (if not installed)
apt-get update && apt-get install -y git

# 3. Navigate to deployment directory
cd /var/www

# 4. Clone with token
git clone https://YOUR_TOKEN@github.com/iamhariprasanth/Motivator.git mybraindoctor

# 5. Enter directory
cd mybraindoctor

# 6. Configure Git to store credentials
git config credential.helper store

# 7. Verify it worked
git status
git log -1

# 8. Pull updates anytime
git pull origin main
```

---

## Updating Your Application

When you push new code to GitHub, update your VPS:

```bash
# SSH to VPS
ssh root@srv1170713

# Navigate to app directory
cd /var/www/mybraindoctor

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild application
npm run build

# Run database migrations if needed
npx prisma migrate deploy

# Restart application
pm2 restart my-brain-doctor

# Check logs
pm2 logs my-brain-doctor --lines 50
```

---

## Security Best Practices

### 1. Use Fine-Grained Tokens (Recommended)

Instead of classic tokens, use fine-grained tokens with limited access:

1. Go to https://github.com/settings/tokens?type=beta
2. Click **"Generate new token"**
3. Name: `VPS Deployment`
4. Repository access: **Only select repositories** → Choose `Motivator`
5. Permissions: **Contents** → Read-only
6. Generate and copy token

### 2. Don't Share Your Token

- ❌ Never commit tokens to Git
- ❌ Never share in public channels
- ❌ Don't paste in screenshots
- ✅ Store securely
- ✅ Rotate regularly (every 90 days)

### 3. Revoke Token if Compromised

If your token is exposed:

1. Go to https://github.com/settings/tokens
2. Find the token
3. Click **"Delete"**
4. Generate a new one

### 4. Use Environment Variables

For deployment scripts:

```bash
# Store token in environment variable
export GITHUB_TOKEN="ghp_your_token_here"

# Use in clone command
git clone https://${GITHUB_TOKEN}@github.com/iamhariprasanth/Motivator.git
```

Add to `~/.bashrc` for persistence:
```bash
echo 'export GITHUB_TOKEN="ghp_your_token_here"' >> ~/.bashrc
source ~/.bashrc
```

---

## Troubleshooting

### "Authentication failed"

```bash
# Check if token is correct
# Try cloning again with fresh token
git clone https://YOUR_NEW_TOKEN@github.com/iamhariprasanth/Motivator.git test

# If it works, update your existing repo
cd /var/www/mybraindoctor
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/iamhariprasanth/Motivator.git
```

### "Repository not found"

```bash
# Make sure:
# 1. Repository URL is correct
# 2. Token has correct permissions (repo scope)
# 3. Repository is accessible to your account

# Verify URL
git remote -v

# Should show:
# origin  https://TOKEN@github.com/iamhariprasanth/Motivator.git (fetch)
# origin  https://TOKEN@github.com/iamhariprasanth/Motivator.git (push)
```

### Token Expired

```bash
# Generate new token from GitHub
# Update remote URL
cd /var/www/mybraindoctor
git remote set-url origin https://NEW_TOKEN@github.com/iamhariprasanth/Motivator.git
git pull
```

### Clear Cached Credentials

```bash
# Remove stored credentials
rm ~/.git-credentials

# Clear credential cache
git credential-cache exit

# Try pulling again (will ask for token)
git pull
```

---

## Alternative: SSH Keys (More Secure)

If you prefer SSH keys instead of tokens:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "vps@srv1170713"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys

# Clone with SSH
git clone git@github.com:iamhariprasanth/Motivator.git mybraindoctor

# No token needed!
```

See [INSTALL_GIT_VPS.md](INSTALL_GIT_VPS.md) for SSH setup details.

---

## Quick Reference

```bash
# Clone with token
git clone https://TOKEN@github.com/USER/REPO.git

# Pull updates
git pull origin main

# Store credentials
git config credential.helper store

# Update remote URL with token
git remote set-url origin https://TOKEN@github.com/USER/REPO.git

# Check remote URL
git remote -v

# Remove stored credentials
rm ~/.git-credentials
```

---

## Example: Complete Setup

```bash
#!/bin/bash

# Variables
GITHUB_TOKEN="ghp_your_token_here"
GITHUB_USER="iamhariprasanth"
REPO_NAME="Motivator"
DEPLOY_DIR="/var/www/mybraindoctor"

# Clone repository
cd /var/www
git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git mybraindoctor

# Configure Git
cd ${DEPLOY_DIR}
git config credential.helper store
git config user.name "VPS Deployment"
git config user.email "vps@srv1170713"

# Verify
git status
echo "✅ Repository cloned successfully!"
```

Save as `clone-repo.sh`, add your token, and run:
```bash
chmod +x clone-repo.sh
./clone-repo.sh
```

---

**Created**: December 28, 2024
**Repository**: https://github.com/iamhariprasanth/Motivator
**VPS**: root@srv1170713
**Token Type**: Personal Access Token (Classic)

---

## Related Guides

- [INSTALL_GIT_VPS.md](INSTALL_GIT_VPS.md) - Installing Git on VPS
- [VPS_DEPLOYMENT.md](VPS_DEPLOYMENT.md) - Complete deployment guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Original deployment documentation
