# AI Powered Trip Advisor - AI-Powered Travel & Tourism Platform

A complete, high-premium travel platform built with Next.js, NestJS, and FastAPI.

## 🚀 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons / React Icons, Framer Motion.
- **Backend (API)**: NestJS (Node.js), Prisma ORM, PostgreSQL.
- **AI Service**: FastAPI (Python), OpenAI API, Weather/Safety Aggregators.
- **Infrastructure**: Stripe (Payments), Mapbox (Tracking), Socket.io (Chat), AWS S3 (Storage).

## 📂 Project Structure
- `/app`: Next.js frontend pages (Explore, Packages, Trip Monitoring, Dashboard).
- `/src`: NestJS backend core (Modules: Auth, Packages, Booking, AI, Chat, Monitoring).
- `/ai_service`: Python FastAPI microservice for recommendations and analysis.
- `/prisma`: Database schema and migrations.

## 🛠️ Modules Implemented
1. **Module 1-2**: Secure Auth & Multi-role Profiles (Traveller/Agency).
2. **Module 3**: Dynamic Tour Package Management with high-res galleries.
3. **Module 4**: Real-time Trip Tracking & Emergency SOS triggers.
4. **Module 5**: Live Chat & Support using Socket.io and persistent history.
5. **Module 6**: Secure Checkout via Stripe with Webhook confirmation.
6. **Module 7**: AI Recommendation Engine & Automated Review System.

## 🔑 Environment Variables (.env)
```env
# Backend
DATABASE_URL=postgresql://user:pass@localhost:5432/travel
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
AI_SERVICE_URL=http://localhost:8000

# AI Service
OPENAI_API_KEY=sk-placeholder-openai
MAPBOX_ACCESS_TOKEN=pk.placeholder.mapbox

# Infrastructure
TWILIO_ACCOUNT_SID=AC_placeholder
AWS_ACCESS_KEY_ID=placeholder_aws
```

## 🏁 How to Start
1. **Database**: `npx prisma migrate dev`
2. **Backend**: `npm run start:dev`
3. **Frontend**: `npm run dev`
4. **AI Service**: `uvicorn main:app --reload` (inside /ai_service)

---
Built with ❤️ by Antigravity AI.
