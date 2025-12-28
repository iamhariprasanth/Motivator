# My Brain doctor - AI-Powered Motivational Coach

**Tagline:** "Your struggle is your story. Your story is your strength."

## 🎯 Overview

My Brain doctor is an AI-powered motivational coaching application that uses powerful movie scenes to inspire users based on their specific life situations. The app operates in **ULTRA DEEP MODE** for maximum relevancy and emotional resonance.

## ✨ Features

- 🎬 **Movie-Powered Wisdom**: Connect your struggles to iconic cinematic moments
- 🧠 **ULTRA DEEP MODE**: Advanced AI analysis for maximum emotional intelligence
- 💡 **Deep Analysis**: Understand the psychology behind your challenges
- ✨ **Actionable Guidance**: Concrete next steps, not just inspiration
- 📊 **Session History**: Track your motivational journey over time
- 📧 **Email Delivery**: Save motivations to your inbox

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Green healing aesthetic

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: PostgreSQL 14+
- **ORM**: Prisma 5.x
- **Authentication**: NextAuth.js

### AI & Services
- **AI**: OpenAI GPT-4
- **Email**: Resend API
- **Deployment**: Hostinger VPS

## 📁 Project Structure

```
Motivator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Frontend pages
│   │   └── api/               # Backend API routes
│   ├── components/            # React components
│   ├── lib/                   # Backend logic & utilities
│   └── types/                 # TypeScript definitions
├── prisma/                    # Database schema
├── docs/                      # Documentation
├── config/                    # Configuration files
└── public/                    # Static assets
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed organization.

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ (or Docker)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Motivator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL** (using Docker)
   ```bash
   docker-compose up -d
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

5. **Set up database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**
   ```
   http://localhost:3000
   ```

## 📖 Documentation

- [Quick Start Guide](docs/QUICKSTART.md) - Get up and running
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to Hostinger VPS
- [Product Requirements](docs/PRD.md) - Full feature specifications
- [Project Structure](docs/PROJECT_STRUCTURE.md) - Code organization
- [Testing Guide](docs/TEST_FLOW.md) - How to test the app
- [Development Notes](docs/CLAUDE.md) - Claude Code development log
- [Security Audit](docs/SECURITY_AUDIT.md) - Security vulnerability analysis
- [Security Fixes](docs/SECURITY_FIXES.md) - Implemented security protections
- [SEO Guide](docs/SEO_GUIDE.md) - Search engine optimization strategy

## 🎯 Key Pages

- **Landing**: http://localhost:3000
- **Demo**: http://localhost:3000/demo (try without signup)
- **Dashboard**: http://localhost:3000/dashboard
- **History**: http://localhost:3000/history

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema changes
```

## 🚀 Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment guide to Hostinger VPS.

Quick deploy:
```bash
scp config/deploy.sh root@your-vps-ip:/root/
ssh root@your-vps-ip 'chmod +x /root/deploy.sh && sudo /root/deploy.sh'
```

## 🎨 Design System

### Colors
- **Primary**: Green gradient (green-600 → emerald-600 → teal-600)
- **Background**: Light green (green-50 → emerald-50)
- **Typography**: Inter font family

## 📝 License

MIT

---

**Your struggle is your story. Your story is your strength. 💪**

Built with ❤️ using Next.js 15, React 19, TypeScript, and GPT-4
