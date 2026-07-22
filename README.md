# 🎓 EduNova AI Platform

<div align="center">

### 🚀 AI-Powered Personalized Learning Platform

*Empowering learners through intelligent, adaptive, and personalized education.*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Lovable AI](https://img.shields.io/badge/Built%20with-Lovable%20AI-7C3AED?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📚 Table of Contents

- About
- Problem Statement
- Solution
- Key Features
- AI Features
- Technology Stack
- Built with Lovable AI
- System Architecture
- Installation
- Environment Variables
- Running the Project
- Build
- Deployment
- Project Structure
- Future Enhancements
- Demo
- Screenshots
- Contributors
- License

---

# 📖 About

EduNova AI is an AI-powered adaptive learning platform developed entirely using **Lovable AI**, enabling rapid development of a modern, scalable, and intelligent educational application.

The platform personalizes learning for every user by understanding their learning goals, interests, and progress. Instead of providing identical content to every learner, EduNova AI delivers customized learning experiences, AI-powered assistance, intelligent recommendations, and detailed progress analytics.

Whether the user is a student, professional, educator, or institution, EduNova AI creates an engaging and personalized educational journey.

---

# ❗ Problem Statement

Traditional learning platforms are designed around a one-size-fits-all model.

Every learner receives the same:

- Learning materials
- Course sequence
- Difficulty level
- Learning pace

regardless of their

- Skill level
- Career goals
- Interests
- Previous knowledge
- Learning style

Because of this,

- Students lose motivation.
- Learners struggle to identify knowledge gaps.
- Professionals waste time searching for relevant resources.
- Institutions cannot efficiently personalize education.

The modern education ecosystem requires an intelligent, adaptive, and AI-powered solution capable of delivering personalized learning experiences at scale.

---

# 💡 Solution

EduNova AI addresses these challenges through Artificial Intelligence and adaptive learning.

The platform analyzes learner profiles, educational goals, completed activities, and performance to generate personalized learning experiences.

EduNova AI provides

- AI-powered recommendations
- Personalized learning paths
- Interactive assessments
- Intelligent tutoring
- Progress analytics
- Adaptive learning

The platform continuously improves recommendations based on learner behavior, ensuring every learner receives relevant educational content.

---

# ✨ Key Features

## 🔐 Secure Authentication

- User Registration
- Secure Login
- Supabase Authentication
- Role-Based Access

---

## 👤 Personalized Dashboard

- Individual Learning Dashboard
- Learning Progress
- Recommended Courses
- Skill Tracking
- Achievement Monitoring

---

## 🤖 AI Tutor

- 24/7 Intelligent Assistant
- Natural Language Conversations
- Concept Explanations
- Doubt Resolution
- Learning Guidance

---

## 📚 Smart Learning

- Personalized Learning Paths
- Adaptive Recommendations
- Interactive Lessons
- Quizzes
- Assessments

---

## 📈 Progress Analytics

- Performance Dashboard
- Course Completion
- Learning Statistics
- AI Insights
- Progress Reports

---

## 🎯 Career Growth

- Skill Recommendations
- Goal Tracking
- Learning Roadmaps
- Future Career Suggestions

---

# 🧠 AI Features

Artificial Intelligence is the foundation of EduNova AI.

The AI engine powers

- Personalized Learning Paths
- Intelligent Course Recommendation
- AI Tutor
- Learning Analytics
- Adaptive Content
- Progress Prediction
- AI Help Desk
- Smart Educational Assistance

AI continuously learns from user interactions and improves future recommendations.

---

# ⚙ Technology Stack

## AI Development Platform

- Lovable AI

---

## Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router
- Tailwind CSS
- Radix UI
- Framer Motion

---

## Backend

- Supabase

---

## Database

- PostgreSQL (Supabase)

---

## Authentication

- Supabase Auth

---

## Storage

- Supabase Storage

---

## Build Tool

- Vite

---

## Deployment

- Vercel
- Cloudflare Workers

---

## Version Control

- Git
- GitHub

---

# 🤖 Built with Lovable AI

EduNova AI was developed entirely using **Lovable AI**, an AI-powered full-stack development platform.

Lovable AI significantly accelerated development by generating and managing

- Full-stack project structure
- React components
- Routing
- Authentication integration
- Database connectivity
- Responsive UI
- Layout generation
- Component styling
- Application architecture

After generation, the project was customized, configured, tested, and deployed for production.

---

# 🏗 System Architecture

```
                     User

                      │

                      ▼

             React Frontend

                      │

              TanStack Router

                      │

             Application Logic

                      │

                Supabase API

          ┌──────────┴──────────┐

          │                     │

 Authentication          PostgreSQL Database

          │                     │

          └──────────┬──────────┘

                     │

               AI Learning Engine

                     │

          Personalized Recommendations

                     │

                Intelligent Dashboard
```

---

# 📂 Project Structure

```
src/

│

├── assets/

├── components/

├── contexts/

├── hooks/

├── lib/

├── routes/

├── services/

├── styles/

├── utils/

├── App.tsx

├── main.tsx

└── routeTree.gen.ts

public/

supabase/

package.json

vite.config.ts

README.md
```

---

# 🚀 Installation

Clone the repository

```bash
https://github.com/nd23s005-ops/edunova-ai-platform
```

Navigate into the project

```bash
cd edunova-ai
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL

VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

# ▶ Running the Project

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 📦 Build

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# ☁ Deployment

## Vercel

Import the GitHub repository.

Build Command

```
npm run build
```

Install Command

```
npm install
```

Output Directory

Leave empty.

---

## Cloudflare Workers

```bash
npm run build

npx wrangler deploy
```

---

# 📸 Screenshots

Include screenshots of

- Landing Page
- Login
- Dashboard
- AI Tutor
- Learning Analytics
- Personalized Recommendations
- Profile Page

---


Live Project

```
https://edunova-ai-platform.lovable.app
```

---

# 🌍 Expected Impact

EduNova AI helps learners become more productive by providing personalized educational experiences.

Benefits include

✅ Improved learner engagement

✅ Personalized education

✅ Faster skill development

✅ Better learning outcomes

✅ Reduced learning gaps

✅ AI-powered academic assistance

✅ Scalable digital education

---

# 🚀 Future Enhancements

- Voice-Based AI Tutor
- AI Interview Preparation
- AI Resume Builder
- Gamification
- Leaderboards
- Mobile Application
- Offline Learning Mode
- Multi-language Support
- AI Career Coach
- AI Content Generation
- Blockchain Certificates

---

# 👨‍💻 Contributors

Developed using **Lovable AI**

Customized and deployed by

DEVANATH N

GitHub



---

# 🤝 Contributing

Contributions are welcome.

Fork the repository

Create a feature branch

```bash
git checkout -b feature-name
```

Commit changes

```bash
git commit -m "Added new feature"
```

Push

```bash
git push origin feature-name
---


---

# ❤️ Acknowledgements

Special thanks to

- Lovable AI
- React Community
- Supabase
- Vite
- Tailwind CSS
- Open Source Community

---

<div align="center">

## ⭐ If you like this project, don't forget to Star the repository!

### 🎓 EduNova AI

### Learn Smarter • Learn Faster • Learn with AI

Made with ❤️ using **Lovable AI**

</div>
