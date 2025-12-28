# Product Requirements Document (PRD)
## My Brain doctor - AI-Powered Motivational Coach

---

## 1. Executive Summary

### Product Name
**My Brain doctor**

### Tagline
"Your struggle is your story. Your story is your strength."

### Vision Statement
Transform people's challenges into breakthroughs through the power of AI and cinematic wisdom.

### Product Overview
My Brain doctor is an AI-powered motivational coaching application that analyzes users' life situations and provides personalized, deeply relevant motivation by connecting their struggles to powerful movie scenes. Operating in ULTRA DEEP MODE, the app delivers maximum emotional intelligence and transformative impact.

### Target Audience
- Individuals facing life challenges (career, relationships, personal growth)
- People seeking motivation and actionable guidance
- Movie enthusiasts who connect with cinematic storytelling
- Users aged 18-45 who are comfortable with technology
- Self-improvement and personal development communities

### Success Metrics
- **User Engagement**: 70% session completion rate
- **AI Quality**: Average validation score of 8.0+/10
- **User Retention**: 40% return user rate within 7 days
- **Response Time**: AI responses delivered in under 8 seconds
- **Satisfaction**: 4.5+ star rating from users

---

## 2. Problem Statement

### User Problems
1. **Generic Advice Overload**: Most motivational content is one-size-fits-all and lacks personal relevance
2. **Emotional Disconnect**: Users struggle to connect abstract advice to their specific situations
3. **Action Gap**: Inspirational quotes without actionable steps lead to inaction
4. **Isolation in Struggles**: People feel alone in their challenges and need relatable examples
5. **Lost Motivation**: Difficult to maintain motivation without meaningful emotional connection

### Market Gap
- Existing motivational apps provide generic quotes or basic AI chatbots
- No solution combines emotional intelligence, movie wisdom, and actionable guidance
- Lack of personalization based on specific life situations and emotional states

---

## 3. Solution Overview

### Core Value Proposition
My Brain doctor provides **hyper-personalized motivational coaching** by:
1. Analyzing the user's emotional state with 7-dimension sentiment detection
2. Matching their situation to relevant movie scenes that mirror their challenge
3. Providing deep psychological insights that create "That's exactly me!" recognition
4. Delivering concrete, actionable next steps specific to their context
5. Empowering users with personalized affirmations that resonate deeply

### Key Differentiators
- **ULTRA DEEP MODE**: Advanced AI analysis beyond surface emotions
- **Movie-Powered Wisdom**: Unique connection to iconic cinematic moments
- **Precision Matching**: AI finds the EXACT right scene for each situation
- **Actionable Guidance**: Concrete next steps, not just inspiration
- **Quality Assurance**: Real-time validation of AI response quality

---

## 4. User Personas

### Persona 1: The Career Climber
- **Name**: Sarah, 28
- **Occupation**: Marketing Manager
- **Challenge**: Repeated job rejections, imposter syndrome
- **Goal**: Overcome self-doubt and land dream job
- **Motivation**: Needs encouragement to keep trying
- **Tech Savvy**: High
- **Usage Pattern**: Weekly during job search periods

### Persona 2: The Anxious Achiever
- **Name**: Michael, 32
- **Occupation**: Software Engineer
- **Challenge**: Public speaking anxiety, fear of failure
- **Goal**: Build confidence for presentations
- **Motivation**: Wants practical coping strategies
- **Tech Savvy**: Very High
- **Usage Pattern**: Before major events/presentations

### Persona 3: The Life Transitioner
- **Name**: Jessica, 35
- **Occupation**: Recently divorced teacher
- **Challenge**: Starting over, feeling lost
- **Goal**: Rebuild confidence and find direction
- **Motivation**: Needs emotional support and guidance
- **Tech Savvy**: Medium
- **Usage Pattern**: Daily during transition period

### Persona 4: The Startup Founder
- **Name**: Alex, 29
- **Occupation**: Entrepreneur
- **Challenge**: Startup struggles, funding pressure
- **Goal**: Stay motivated through tough times
- **Motivation**: Needs resilience and strategic thinking
- **Tech Savvy**: Very High
- **Usage Pattern**: During pivotal moments/challenges

---

## 5. Feature Requirements

### 5.1 MVP Features (Completed)

#### F1: Landing Page
**Priority**: P0 (Critical)
**Description**: Split-screen landing page that introduces the product
**User Story**: As a new visitor, I want to understand what My Brain doctor offers
**Acceptance Criteria**:
- [x] Green gradient left half with product description
- [x] Logo and feature cards on right half
- [x] "Try Demo Now", "Get Started Free", "Login" buttons
- [x] Responsive design (mobile, tablet, desktop)
- [x] Loading time < 1 second

#### F2: Sentiment Detection Engine
**Priority**: P0 (Critical)
**Description**: AI-powered detection of user's emotional state
**User Story**: As a user, I want the AI to understand my emotional state
**Acceptance Criteria**:
- [x] Detects 7 emotions: despair, anxiety, anger, sadness, confusion, hope, determination
- [x] Keyword and pattern matching
- [x] 100% accuracy on test cases
- [x] Processing time < 10ms

#### F3: ULTRA DEEP MODE AI Engine
**Priority**: P0 (Critical)
**Description**: GPT-4 powered motivation generation
**User Story**: As a user, I want deeply relevant motivation
**Acceptance Criteria**:
- [x] Integrates with OpenAI GPT-4 API
- [x] Returns structured response (quote, movie scene, deep meaning, actionable path, affirmation)
- [x] Response time 3-8 seconds
- [x] Quality validation score 7+/10

#### F4: Demo Page
**Priority**: P0 (Critical)
**Description**: Try the app without authentication
**User Story**: As a visitor, I want to test the app before signing up
**Acceptance Criteria**:
- [x] Text input for situation (min 10 characters)
- [x] 3 pre-loaded example situations
- [x] "Get Motivated" button
- [x] Display AI response with all sections
- [x] Character counter
- [x] "Back to Home" navigation link

#### F5: Dashboard
**Priority**: P0 (Critical)
**Description**: Main interface for logged-in users
**User Story**: As a user, I want a personal dashboard to get motivation
**Acceptance Criteria**:
- [x] Header with logo and navigation
- [x] Motivation input form
- [x] Response display card
- [x] Session statistics (sessions today, movie scenes, ULTRA DEEP MODE status)
- [x] Recent sessions sidebar
- [x] Tips for best results

#### F6: History Page
**Priority**: P1 (High)
**Description**: View all past motivation sessions
**User Story**: As a user, I want to review my past sessions
**Acceptance Criteria**:
- [x] List of all sessions (chronological)
- [x] Filter by emotion type
- [x] Click to expand full response
- [x] Statistics dashboard (total sessions, most common emotion, avg quality score)
- [x] LocalStorage persistence (50 most recent)

#### F7: Email Delivery
**Priority**: P1 (High)
**Description**: Send motivation to user's email
**User Story**: As a user, I want to receive motivation via email
**Acceptance Criteria**:
- [x] Email input field on result card
- [x] "Send to Email" button
- [x] HTML email template with green theme
- [x] Resend API integration
- [x] Success/error feedback

#### F8: Response Validation
**Priority**: P1 (High)
**Description**: Quality assurance for AI responses
**User Story**: As a user, I want high-quality, relevant responses
**Acceptance Criteria**:
- [x] Word count validation (~100 words optimal)
- [x] Format compliance checking
- [x] Emotional resonance scoring
- [x] Situational precision analysis
- [x] Score display (0-10 scale)

### 5.2 Phase 2 Features (Authentication & Database)

#### F9: User Authentication
**Priority**: P0 (Critical)
**Description**: Secure user login and registration
**User Story**: As a user, I want to create an account and log in securely
**Acceptance Criteria**:
- [ ] Email/password registration
- [ ] Email/password login
- [ ] NextAuth.js integration
- [ ] Password hashing (bcrypt)
- [ ] Session management
- [ ] "Forgot Password" flow
- [ ] Email verification

#### F10: Database Persistence
**Priority**: P0 (Critical)
**Description**: Store user data and sessions in PostgreSQL
**User Story**: As a user, I want my data saved permanently
**Acceptance Criteria**:
- [ ] PostgreSQL database setup
- [ ] Prisma ORM integration
- [ ] User model (id, email, name, password, createdAt)
- [ ] Session model (id, userId, situation, sentiment, response, score, createdAt)
- [ ] Migration from LocalStorage to database
- [ ] Data backup strategy

#### F11: User Profile
**Priority**: P1 (High)
**Description**: View and edit user profile information
**User Story**: As a user, I want to manage my profile
**Acceptance Criteria**:
- [ ] Profile page (/profile)
- [ ] Display user info (name, email, member since)
- [ ] Edit name
- [ ] Change password
- [ ] Delete account option
- [ ] Session statistics

#### F12: Protected Routes
**Priority**: P0 (Critical)
**Description**: Restrict dashboard and history to logged-in users
**User Story**: As the system, I want to protect user data
**Acceptance Criteria**:
- [ ] Middleware for authentication check
- [ ] Redirect to login if not authenticated
- [ ] Preserve intended destination after login
- [ ] Session persistence

### 5.3 Phase 3 Features (Enhanced Experience)

#### F13: Movie Scenes Database
**Priority**: P1 (High)
**Description**: Pre-loaded database of 50+ movie scenes
**User Story**: As a user, I want diverse movie scene matches
**Acceptance Criteria**:
- [ ] 50+ movie scenes across categories
- [ ] Categories: Career, Fear, Identity, Relationships, Growth
- [ ] Movie metadata (title, year, scene description)
- [ ] Scene quotes
- [ ] Sentiment tagging
- [ ] Database seeding script

#### F14: Social Sharing
**Priority**: P2 (Medium)
**Description**: Share affirmations on social media
**User Story**: As a user, I want to share my affirmations
**Acceptance Criteria**:
- [ ] Share to Twitter, Facebook, LinkedIn
- [ ] Beautiful share cards with branding
- [ ] Referral tracking
- [ ] Privacy controls (share anonymously)

#### F15: Voice Input
**Priority**: P2 (Medium)
**Description**: Speak situation instead of typing
**User Story**: As a user, I want to speak my situation
**Acceptance Criteria**:
- [ ] Microphone button
- [ ] Speech-to-text conversion
- [ ] Support for major browsers
- [ ] Fallback to typing

#### F16: Video Clips
**Priority**: P2 (Medium)
**Description**: Embed movie scene video clips
**User Story**: As a user, I want to watch the actual movie scene
**Acceptance Criteria**:
- [ ] YouTube API integration
- [ ] Video player embedded in response
- [ ] Licensed clips or fair use
- [ ] Fallback to text description

#### F17: Daily Prompts
**Priority**: P2 (Medium)
**Description**: Receive daily motivational prompts
**User Story**: As a user, I want daily inspiration
**Acceptance Criteria**:
- [ ] Daily email with prompt
- [ ] In-app notifications
- [ ] Customizable frequency
- [ ] Prompt categories (career, relationships, growth)

#### F18: Progress Visualization
**Priority**: P2 (Medium)
**Description**: Charts showing emotional journey over time
**User Story**: As a user, I want to see my progress
**Acceptance Criteria**:
- [ ] Line chart of sentiment over time
- [ ] Most common emotions pie chart
- [ ] Session frequency heatmap
- [ ] Export data as CSV

### 5.4 Phase 4 Features (Monetization & Scale)

#### F19: Premium Subscription
**Priority**: P1 (High)
**Description**: Paid tier with enhanced features
**User Story**: As a user, I want advanced features
**Acceptance Criteria**:
- [ ] Stripe integration
- [ ] Free tier: 5 sessions/month
- [ ] Premium tier: Unlimited sessions, priority support, video clips
- [ ] Subscription management
- [ ] Billing portal

#### F20: Admin Dashboard
**Priority**: P1 (High)
**Description**: Internal tool for monitoring and analytics
**User Story**: As an admin, I want to monitor the platform
**Acceptance Criteria**:
- [ ] User statistics (total users, active users, churn)
- [ ] System health (API uptime, response times)
- [ ] AI quality metrics (avg scores, failure rate)
- [ ] Revenue analytics (MRR, LTV, churn)
- [ ] User management (ban, delete, support)

#### F21: API Access
**Priority**: P2 (Medium)
**Description**: Public API for third-party integration
**User Story**: As a developer, I want to integrate My Brain doctor
**Acceptance Criteria**:
- [ ] RESTful API endpoints
- [ ] API key authentication
- [ ] Rate limiting
- [ ] API documentation
- [ ] Usage analytics

#### F22: Integrations
**Priority**: P2 (Medium)
**Description**: Connect with other platforms
**User Story**: As a user, I want My Brain doctor in my favorite apps
**Acceptance Criteria**:
- [ ] Slack bot
- [ ] Discord bot
- [ ] Telegram bot
- [ ] Chrome extension
- [ ] Mobile app (React Native)

---

## 6. User Flows

### 6.1 First-Time Visitor Flow
```
Landing Page → Try Demo Now → Enter Situation → Get Motivated → View Response → Sign Up → Create Account → Dashboard
```

### 6.2 Returning User Flow
```
Landing Page → Login → Dashboard → Enter Challenge → Get Motivated → View Response → Check History → Logout
```

### 6.3 Email Sharing Flow
```
Dashboard → Enter Situation → Get Motivated → Enter Email → Send to Email → Confirmation Message
```

### 6.4 Session History Flow
```
Dashboard → History → Filter by Emotion → Select Session → View Full Response → Return to Dashboard
```

---

## 7. Technical Requirements

### 7.1 Frontend

#### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Hooks (useState, useEffect, usePathname)

#### Performance Requirements
- **Page Load**: < 1 second (first contentful paint)
- **Time to Interactive**: < 2 seconds
- **Bundle Size**: < 500KB (compressed)
- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)

#### Browser Support
- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Responsive Design
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### 7.2 Backend

#### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL 14+
- **ORM**: Prisma 5.x
- **Authentication**: NextAuth.js
- **Email**: Resend API

#### API Requirements
- **Response Time**: < 200ms (excluding AI processing)
- **AI Processing**: 3-8 seconds (OpenAI dependent)
- **Uptime**: 99.9%
- **Rate Limiting**: 60 requests/minute per user

#### Database Requirements
- **Connections**: Max 100 concurrent
- **Backup**: Daily automated backups
- **Retention**: 30 days minimum
- **Replication**: Read replicas for scaling

### 7.3 AI & External Services

#### OpenAI Integration
- **Model**: GPT-4 or GPT-4-turbo
- **Max Tokens**: 500 per response
- **Temperature**: 0.7 (balanced creativity)
- **Timeout**: 30 seconds
- **Fallback**: Graceful error handling

#### Email Service
- **Provider**: Resend
- **Rate Limit**: Respect provider limits
- **Deliverability**: 95%+ inbox rate
- **Templates**: HTML with fallback to plain text

### 7.4 Infrastructure

#### Hosting
- **Platform**: Hostinger VPS
- **OS**: Ubuntu 20.04+
- **RAM**: 4GB minimum
- **Storage**: 50GB SSD
- **CPU**: 2 cores minimum

#### Process Management
- **Manager**: PM2
- **Instances**: Cluster mode (max CPUs)
- **Auto-restart**: Enabled
- **Log Rotation**: Daily

#### Web Server
- **Reverse Proxy**: Nginx
- **HTTP/2**: Enabled
- **Gzip Compression**: Enabled
- **SSL/TLS**: Let's Encrypt (auto-renewal)

### 7.5 Security Requirements

#### Authentication & Authorization
- **Password Hashing**: bcrypt (cost factor 10+)
- **Session Tokens**: Secure, httpOnly cookies
- **Token Expiry**: 30 days (configurable)
- **CSRF Protection**: Enabled

#### Data Protection
- **Encryption**: TLS 1.2+ for data in transit
- **Database**: Encrypted connections
- **API Keys**: Environment variables only
- **Secrets Rotation**: Quarterly

#### Compliance
- **GDPR**: Right to access, delete data
- **CCPA**: Data disclosure compliance
- **Privacy Policy**: Clearly stated
- **Terms of Service**: Legal coverage

---

## 8. Design Requirements

### 8.1 Visual Design

#### Color Palette
```
Primary Green Gradient:
- from-green-600 (#059669)
- via-emerald-600 (#10b981)
- to-teal-600 (#0d9488)

Background Shades:
- bg-green-50 (#f0fdf4)
- bg-emerald-50 (#ecfdf5)

Text Colors:
- text-green-600 (#059669)
- text-green-700 (#047857)
- text-green-900 (#064e3b)
- text-gray-700 (#374151)
- text-gray-900 (#111827)

Sentiment Colors:
- Despair: Purple (#9333ea)
- Anxiety: Yellow (#eab308)
- Anger: Red (#dc2626)
- Sadness: Blue (#3b82f6)
- Confusion: Gray (#6b7280)
- Hope: Green (#10b981)
- Determination: Orange (#f97316)
```

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 2xl-7xl
- **Body**: Regular, base-lg
- **Small Text**: xs-sm

#### Spacing
- **Padding**: Tailwind scale (4, 6, 8, 12, 16, 24)
- **Margins**: Consistent vertical rhythm
- **Gaps**: 3-6 between elements

#### Shadows
- **Cards**: shadow-lg
- **Buttons**: shadow-md, hover:shadow-lg
- **Modals**: shadow-2xl

### 8.2 Component Design

#### Buttons
- **Primary**: Green gradient, white text, rounded-xl
- **Secondary**: Border green, green text, hover:fill
- **Disabled**: Opacity 50%, no hover

#### Forms
- **Inputs**: Border green-200, focus:ring green-500
- **Labels**: Text gray-700, font-medium
- **Errors**: Text red-600, border red-300

#### Cards
- **Background**: White
- **Border**: Left border 4px green-500
- **Padding**: 6
- **Rounded**: 2xl

### 8.3 Accessibility

#### WCAG Compliance
- **Level**: AA minimum
- **Color Contrast**: 4.5:1 (text), 3:1 (large text)
- **Keyboard Navigation**: Full support
- **Screen Readers**: ARIA labels

#### Features
- **Focus Indicators**: Visible on all interactive elements
- **Alt Text**: All images
- **Semantic HTML**: Proper heading hierarchy
- **Skip Links**: Skip to main content

---

## 9. Analytics & Metrics

### 9.1 User Metrics

#### Engagement
- **Sessions per User**: Average, median
- **Session Duration**: Time on site
- **Return Rate**: % users returning within 7 days
- **Completion Rate**: % sessions resulting in full response

#### Usage Patterns
- **Peak Hours**: When users are most active
- **Device Split**: Mobile vs desktop
- **Page Views**: Most visited pages
- **Drop-off Points**: Where users leave

### 9.2 AI Quality Metrics

#### Response Quality
- **Validation Scores**: Average, distribution
- **Sentiment Accuracy**: % correct detections
- **Response Time**: P50, P95, P99
- **Failure Rate**: % failed AI requests

#### Content Metrics
- **Word Count**: Average, distribution
- **Movie Scenes**: Most used, diversity
- **Sentiment Distribution**: Which emotions most common

### 9.3 Business Metrics

#### Growth
- **New Users**: Daily, weekly, monthly
- **Active Users**: DAU, MAU
- **Growth Rate**: % increase over time
- **Churn Rate**: % users who stop using

#### Revenue (Future)
- **MRR**: Monthly Recurring Revenue
- **LTV**: Lifetime Value per user
- **CAC**: Customer Acquisition Cost
- **Conversion Rate**: Free to paid

---

## 10. Success Criteria

### 10.1 MVP Success (Completed)
- [x] Application deployed and accessible
- [x] AI generates responses in < 8 seconds
- [x] Validation scores average 7+/10
- [x] 100% sentiment detection accuracy on test cases
- [x] Responsive design works on all devices
- [x] Email delivery success rate 95%+

### 10.2 Phase 2 Success (Targets)
- [ ] 1,000+ registered users
- [ ] 70% session completion rate
- [ ] 40% return user rate (7 days)
- [ ] 99.9% uptime
- [ ] < 2 second average page load

### 10.3 Phase 3 Success (Targets)
- [ ] 10,000+ registered users
- [ ] 80% session completion rate
- [ ] 50% return user rate (7 days)
- [ ] 4.5+ star average rating
- [ ] Featured in app stores or directories

### 10.4 Phase 4 Success (Targets)
- [ ] 50,000+ registered users
- [ ] 10% conversion to premium
- [ ] $10,000+ MRR
- [ ] 50+ movie scenes in database
- [ ] Mobile app launched

---

## 11. Risks & Mitigation

### 11.1 Technical Risks

#### Risk: OpenAI API Downtime
- **Impact**: App unusable, user frustration
- **Probability**: Low (99.9% uptime SLA)
- **Mitigation**: Implement retry logic, queue requests, show status page

#### Risk: Database Failure
- **Impact**: Data loss, service disruption
- **Probability**: Low with proper setup
- **Mitigation**: Daily backups, replication, monitoring alerts

#### Risk: Security Breach
- **Impact**: User data compromised, legal issues
- **Probability**: Medium (constant threat)
- **Mitigation**: Security audits, penetration testing, bug bounty

### 11.2 Business Risks

#### Risk: Low User Adoption
- **Impact**: Failed product, wasted effort
- **Probability**: Medium (competitive market)
- **Mitigation**: User testing, marketing, clear value prop

#### Risk: High OpenAI API Costs
- **Impact**: Negative margins, unsustainable
- **Probability**: Medium (depends on usage)
- **Mitigation**: Caching, rate limiting, premium pricing

#### Risk: Copyright Issues (Movie Scenes)
- **Impact**: Legal action, content removal
- **Probability**: Low (fair use, transformative)
- **Mitigation**: Legal review, user-generated content, licensing

### 11.3 Operational Risks

#### Risk: Scaling Challenges
- **Impact**: Slow performance, downtime
- **Probability**: Medium (if successful)
- **Mitigation**: Load testing, auto-scaling, CDN

#### Risk: Support Burden
- **Impact**: Poor user experience, churn
- **Probability**: Medium (as users grow)
- **Mitigation**: FAQ, documentation, chatbot, ticket system

---

## 12. Timeline & Roadmap

### Phase 1: MVP (Completed - December 2024)
- Week 1-2: Project setup, core AI engine
- Week 3: Landing page, demo, dashboard
- Week 4: Polish, testing, deployment

### Phase 2: Auth & Database (Q1 2025)
- Month 1: Authentication system, user profiles
- Month 2: Database migration, protected routes
- Month 3: Testing, bug fixes, optimization

### Phase 3: Enhanced Features (Q2 2025)
- Month 1: Movie scenes database, social sharing
- Month 2: Voice input, video clips
- Month 3: Daily prompts, progress visualization

### Phase 4: Monetization (Q3 2025)
- Month 1: Premium subscription, Stripe integration
- Month 2: Admin dashboard, analytics
- Month 3: API access, integrations

### Phase 5: Scale (Q4 2025)
- Month 1: Mobile app development
- Month 2: Advanced features, community
- Month 3: Marketing push, partnerships

---

## 13. Appendix

### 13.1 Glossary

- **ULTRA DEEP MODE**: Advanced AI analysis system for maximum emotional intelligence
- **Sentiment Detection**: AI-powered emotion recognition (7 categories)
- **Validation Score**: Quality metric for AI responses (0-10 scale)
- **Movie Scene Matching**: Connecting user situations to relevant cinematic moments
- **Actionable Path**: Concrete next steps provided in AI response

### 13.2 References

- OpenAI API Documentation: https://platform.openai.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- NextAuth.js Documentation: https://next-auth.js.org
- Tailwind CSS Documentation: https://tailwindcss.com/docs

### 13.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 28, 2024 | Development Team | Initial PRD creation |

---

**Document Status**: Living Document
**Last Updated**: December 28, 2024
**Next Review**: Q1 2025
