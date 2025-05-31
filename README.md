# 🎓 LearnCraft
The Future of AI Learning - Create personalized courses with a simple prompt.

## 📌 Problem Statement
Problem Statement - Revolutionize Education with AI-Powered Personalized Learning

## 🎯 Objective
LearnCraft solves the challenge of personalized education accessibility by allowing anyone to create comprehensive, AI-generated courses tailored to their learning style and pace. It serves both educators who need efficient course creation tools and learners seeking customized educational content.

Our platform transforms simple learning goals into fully-structured, interactive courses with video content, progress tracking, and adaptive learning paths using the power of AI, democratizing quality education and drastically reducing the time from concept to comprehensive course delivery.

## 🧠 Team & Approach
**Team Name:**
    Solo Developer

**Team Members:**
- Gaurav Chaudhary 
   X = https://x.com/GauravC18959107?t=9zYkQqvjjy-QiWOwyO2KMQ&s=09
   LinkedIn = https://www.linkedin.com/in/mrnobody-flex-680baa215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

**Our Approach:**
I choose this problem because traditional education systems struggle with one-size-fits-all approaches, leaving many learners behind. Our solution leverages AI to create personalized learning experiences that adapt to individual needs, making quality education accessible to everyone regardless of their background or learning style.

Key challenges we addressed include:
- Converting natural language learning goals into structured course curricula
- Integrating multiple AI services for content generation and video curation
- Building a comprehensive learning management system with progress tracking
- Creating an intuitive interface that works for both educators and learners
- Ensuring scalable course delivery with real-time progress analytics

## 🛠️ Tech Stack
**Core Technologies Used:**
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, PostgreSQL, Drizzle ORM
- **Authentication:** Clerk Auth
- **AI Integration:** Google Gemini API, YouTube Data API
- **Database:** Neon PostgreSQL
- **UI Components:** Radix UI, Lucide React Icons

**Technologies Used:**
- ✅ **Google Gemini:** Used as the primary AI provider for course content generation, chapter creation, and educational material development
- ✅ **YouTube Data API:** Integrated for curating relevant educational videos to complement course content
- ✅ **Clerk:** Provides secure user authentication and profile management
- ✅ **Drizzle ORM:** Type-safe database operations with PostgreSQL

## ✨ Key Features
- ✅ **AI-Powered Course Generation** - Create complete courses by describing your learning goals in natural language
- ✅ **Interactive Learning Dashboard** - Comprehensive workspace for managing courses, progress, and learning analytics
- ✅ **Video Integration** - Automatically curated YouTube videos relevant to each chapter
- ✅ **Progress Tracking** - Advanced completion tracking with visual progress indicators
- ✅ **Mobile Responsive Design** - Seamless learning experience across all devices
- ✅ **Chapter-by-Chapter Learning** - Structured learning path with detailed content for each topic
- ✅ **User Profile Management** - Personalized learning profiles with progress history
- ✅ **Course Exploration** - Discover and enroll in courses created by other users

## 📽️ Demo & Deliverables
- **Demo Video Link:** [Coming Soon]
- **Live Demo:** [Your deployment URL]
- **GitHub Repository:** https://github.com/yourusername/learncraft

## 🧪 How to Run the Project
**Requirements:**
- Node.js v18+
- npm or yarn
- PostgreSQL database (Neon recommended)
- Google Gemini API Key
- YouTube Data API Key
- Clerk Authentication Keys

**Environment Setup:**
1. Create a `.env` file in the root directory with:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # Database
   DATABASE_URL=your_postgresql_connection_string
   NEXT_PUBLIC_DATABASE_URL=your_postgresql_connection_string

   # AI Services
   GEMINI_API_KEY=your_google_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_data_api_key
   ```

**Local Setup:**
```bash
# Clone the repository
git clone https://github.com/yourusername/learncraft.git
cd learncraft

# Install dependencies
npm install

# Set up the database
npm run db:generate
npm run db:push

# Start the development server
npm run dev
```

**Production Deployment:**
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🧬 Future Scope
- **Advanced Analytics** - Detailed learning analytics and performance insights
- **AI Tutoring Assistant** - Interactive AI chatbot for personalized learning support
- **Collaborative Learning** - Group courses and peer-to-peer learning features
- **Certificate Generation** - Automated certificate creation upon course completion
- **Multi-language Support** - Course generation and content in multiple languages
- **Offline Learning** - Download courses for offline access
- **Advanced Assessment** - AI-generated quizzes and interactive assessments
- **Learning Path Recommendations** - AI-suggested learning sequences based on user goals

## 📎 Resources / Credits
- [Google Gemini API](https://ai.google.dev/) - AI language model powering course content generation
- [YouTube Data API](https://developers.google.com/youtube/v3) - Video content integration and curation
- [Clerk](https://clerk.com/) - User authentication and management
- [Next.js](https://nextjs.org/) - React framework for full-stack development
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database operations
- [Neon](https://neon.tech/) - Serverless PostgreSQL database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

## 🏁 Final Words
LearnCraft represents our vision for the future of education, where AI-powered personalization makes quality learning accessible to everyone. Our development journey involved integrating multiple AI services, building a comprehensive learning management system, and creating an intuitive user experience that adapts to individual learning needs.

We're proud of creating a platform that demonstrates how AI can transform education, making it more personalized, engaging, and effective. LearnCraft shows how emerging technologies can solve real educational challenges and empower learners to achieve their goals more efficiently than ever before.

The future of learning is here, and it's personalized, intelligent, and accessible to all.