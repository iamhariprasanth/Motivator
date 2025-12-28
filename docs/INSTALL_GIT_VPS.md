# Installing Git on Hostinger VPS

This guide will help you install Git on your Hostinger VPS server.

---

## Quick Install (Ubuntu/Debian)

SSH to your VPS and run:

```bash
# SSH to your VPS
ssh root@srv1170713

# Update package list
apt-get update

# Install Git
apt-get install -y git

# Verify installation
git --version
```

---

## Detailed Steps

### Step 1: Connect to Your VPS

```bash
ssh root@srv1170713
```

### Step 2: Update System Packages

```bash
apt-get update
apt-get upgrade -y
```

### Step 3: Install Git

#### For Ubuntu/Debian:
```bash
apt-get install -y git
```

#### For CentOS/RHEL:
```bash
yum install -y git
```

#### For AlmaLinux/Rocky Linux:
```bash
dnf install -y git
```

### Step 4: Verify Installation

```bash
git --version
# Should output: git version 2.x.x
```

---

## Configure Git (Optional but Recommended)

Set up your Git identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## Clone Your Repository

Once Git is installed, you can clone your repository:

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
git clone https://github.com/iamhariprasanth/Motivator.git mybraindoctor

# Enter directory
cd mybraindoctor

# Check current branch
git branch

# Check status
git status
```

---

## Set Up SSH Keys for GitHub (Optional)

For easier authentication with GitHub:

### 1. Generate SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)

# View your public key
cat ~/.ssh/id_ed25519.pub
```

### 2. Add SSH Key to GitHub

1. Copy the output from the previous command
2. Go to https://github.com/settings/keys
3. Click "New SSH key"
4. Paste your public key
5. Click "Add SSH key"

### 3. Test SSH Connection

```bash
ssh -T git@github.com
# Should output: Hi username! You've successfully authenticated...
```

### 4. Clone with SSH

```bash
cd /var/www
git clone git@github.com:iamhariprasanth/Motivator.git mybraindoctor
```

---

## Common Git Commands for VPS

### Pull Latest Changes

```bash
cd /var/www/mybraindoctor
git pull origin main
```

### Check Repository Status

```bash
git status
git log --oneline -5
```

### Reset to Latest Version

```bash
# WARNING: This will discard local changes
git fetch origin
git reset --hard origin/main
```

### Create a Branch

```bash
git checkout -b staging
```

### Switch Branches

```bash
git checkout main
git checkout staging
```

---

## Troubleshooting

### "git: command not found"

```bash
# Update package list and try again
apt-get update
apt-get install -y git
```

### Permission Denied

```bash
# Make sure you're root or use sudo
sudo apt-get install -y git
```

### "Unable to locate package git"

```bash
# Add universe repository (Ubuntu)
add-apt-repository universe
apt-get update
apt-get install -y git
```

### SSL Certificate Error

```bash
# Update CA certificates
apt-get install -y ca-certificates
update-ca-certificates
```

---

## Complete Installation Script

Save this as `install-git.sh` and run it:

```bash
#!/bin/bash

echo "Installing Git on Hostinger VPS..."

# Update system
apt-get update
apt-get upgrade -y

# Install Git
apt-get install -y git

# Install additional useful tools
apt-get install -y curl wget vim nano

# Verify installation
echo ""
echo "Git version:"
git --version

echo ""
echo "✅ Git installed successfully!"
echo ""
echo "Configure Git with:"
echo "  git config --global user.name 'Your Name'"
echo "  git config --global user.email 'your.email@example.com'"
echo ""
echo "Clone your repository with:"
echo "  cd /var/www"
echo "  git clone https://github.com/iamhariprasanth/Motivator.git mybraindoctor"
```

Run it:
```bash
chmod +x install-git.sh
./install-git.sh
```

---

## After Git Installation

Once Git is installed, you can proceed with the deployment:

```bash
# Clone repository
cd /var/www
git clone https://github.com/iamhariprasanth/Motivator.git mybraindoctor
cd mybraindoctor

# Install Node.js if not already installed
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install dependencies
npm install

# Continue with deployment...
```

---

## Quick Reference

```bash
# Install Git
apt-get update && apt-get install -y git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Clone repository
git clone https://github.com/iamhariprasanth/Motivator.git

# Pull updates
git pull origin main

# Check status
git status

# View version
git --version
```

---

**Updated**: December 28, 2024
**VPS**: Hostinger srv1170713
**Repository**: https://github.com/iamhariprasanth/Motivator.git
