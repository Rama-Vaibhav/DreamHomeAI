# 🏠 Dream Home AI

> **Snaphomz Hackathon 2.0 • Project #1**
> *"Discover the home that matches your lifestyle before you ever search for a property."*

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

📄 **[Design Choices & Methodology (PDF)](./docs/design_document.pdf)** — Formal documentation of architecture, scoring algorithms, and design rationale.

---

## ✨ What is Dream Home AI?

Dream Home AI is an **AI-powered home personality quiz** that helps users discover their unique home style, visualize their dream spaces, and get matched with real property listings — all in under 2 minutes.

### The Flow

```
Take Quiz → Get Personality → See AI Visuals → Match Properties → Share & Explore
```

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Personality Engine** | 8-question quiz maps to 10 unique home personality types |
| 🎨 **Dream Visuals** | AI-generated room visualizations (bedroom, kitchen, exterior, workspace) |
| 🏠 **Smart Matching** | Multi-factor scoring engine matches 50 properties with % breakdowns |
| 📸 **Shareable Cards** | Download personality card as PNG, share on Twitter/X |
| 🌙 **Dark Luxury UI** | Glassmorphism design with smooth animations |
| 🔒 **No Auth Required** | Zero friction — jump right into the quiz |
| 💪 **Never Breaks** | Fallback images ensure the demo works without any API keys |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────┐
│              VERCEL EDGE                      │
├──────────────────────────────────────────────┤
│                                              │
│  Pages:                                      │
│  ├── / (Landing Page — SSR + CSR)            │
│  ├── /quiz (Quiz Flow — CSR)                 │
│  └── /results (Results Dashboard — CSR)      │
│                                              │
│  API Routes:                                 │
│  ├── POST /api/quiz/analyze                  │
│  ├── POST /api/generate-images               │
│  └── POST /api/recommendations               │
│                                              │
│  Engines:                                    │
│  ├── Personality Engine (weighted scoring)   │
│  └── Matching Engine (multi-factor scoring)  │
│                                              │
│  Data:                                       │
│  ├── 50 mock property listings               │
│  ├── 10 personality definitions              │
│  └── Curated fallback images                 │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** (Strict Mode) |
| Styling | **Tailwind CSS 4** |
| UI Components | **ShadCN UI** (Radix-based) |
| Animations | **Framer Motion** |
| Image Export | **html-to-image** |
| Validation | **Zod** |
| Deployment | **Vercel** (zero-config) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dream-home-ai.git

# Navigate to the project
cd dream-home-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── quiz/analyze/route.ts    # Personality analysis endpoint
│   │   ├── generate-images/route.ts # Dream visual generation
│   │   └── recommendations/route.ts # Property matching
│   ├── quiz/page.tsx                # Quiz flow page
│   ├── results/page.tsx             # Results dashboard
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # Root layout + SEO
│   └── globals.css                  # Design tokens + theme
├── components/
│   ├── landing/                     # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeaturedHomes.tsx
│   │   ├── SocialProof.tsx
│   │   ├── WhyDreamHome.tsx
│   │   └── Footer.tsx
│   ├── quiz/                        # Quiz flow components
│   │   ├── QuizProvider.tsx         # Context + state management
│   │   ├── QuizProgress.tsx         # Animated progress bar
│   │   └── QuizStep.tsx             # Step renderer
│   ├── results/                     # Results page components
│   │   ├── PersonalityCard.tsx      # Glassmorphism card
│   │   ├── DreamVisuals.tsx         # Room image grid
│   │   ├── PropertyMatches.tsx      # Match section
│   │   ├── PropertyCard.tsx         # Individual property
│   │   ├── SharePanel.tsx           # Share/download
│   │   └── CTABanner.tsx            # Snaphomz CTA
│   └── ui/                          # ShadCN components
├── data/
│   ├── properties.ts                # 50 mock listings
│   ├── personalities.ts             # 10 personality types
│   ├── quiz-questions.ts            # 8 quiz questions
│   └── fallback-images.ts           # Curated Unsplash URLs
├── lib/
│   ├── engines/
│   │   ├── personality-engine.ts    # Weighted scoring
│   │   └── matching-engine.ts       # Multi-factor matching
│   ├── services/
│   │   └── image-service.ts         # AI image + fallback
│   └── utils.ts                     # Utility functions
└── types/
    └── index.ts                     # All TypeScript types
```

---

## 🧠 How the Personality Engine Works

The quiz maps 8 lifestyle dimensions to 10 personality types using weighted scoring:

| Dimension | Weight | What it measures |
|-----------|--------|-----------------|
| Lifestyle | 25% | Urban, suburban, nature, social, creative |
| Architecture | 25% | Modern, traditional, minimalist, industrial, mediterranean |
| Weekend | 20% | How you spend leisure time |
| Work Style | 15% | Office, remote, hybrid, entrepreneur, freelancer |
| Must-Haves | 15% | Feature preferences (pool, gym, garden, etc.) |

### The 10 Personality Types

| # | Personality | Tagline |
|---|-------------|---------|
| 1 | 🏙️ The Urban Visionary | Where innovation meets skyline |
| 2 | 🏡 The Cozy Nester | Warmth in every corner |
| 3 | 🌿 The Nature Harmonist | Living in sync with the earth |
| 4 | 👑 The Luxe Curator | Only the finest will do |
| 5 | 🧘 The Minimalist Sage | Less is the ultimate luxury |
| 6 | 🎨 The Creative Maverick | Where art meets architecture |
| 7 | 🎉 The Social Architect | Built for togetherness |
| 8 | 🤖 The Tech Pioneer | Smart living, redefined |
| 9 | 🌸 The Wellness Dweller | Home is your healing space |
| 10 | 🏰 The Heritage Keeper | Where history meets heart |

---

## 🏠 Property Matching Scoring

Properties are scored across 5 dimensions:

| Factor | Weight | How it scores |
|--------|--------|--------------|
| Style | 25% | Exact arch. style match = 100, related = 50 |
| Budget | 25% | Within range = 100, ±20% = 60, ±40% = 30 |
| Lifestyle | 20% | Tag overlap with lifestyle, weekend, work |
| Space | 15% | Square footage alignment with size preference |
| Features | 15% | Must-have amenity coverage |

---

## 🌐 Deployment

This project is **Vercel-ready** with zero configuration needed.

```bash
# Option 1: Via Vercel Dashboard
# Just connect your GitHub repo — Vercel auto-detects Next.js

# Option 2: Via CLI
npx vercel --prod
```

See [guide_for_vercel_deployment.txt](./guide_for_vercel_deployment.txt) for detailed instructions.

### Environment Variables (Optional)

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | Enables DALL-E image generation. Falls back to Unsplash if not set. |

---

## 🔮 Future Roadmap

- [ ] Connect to **Snaphomz API** for real listings
- [ ] Add user accounts with **NextAuth.js**
- [ ] **Database** for quiz analytics (Supabase)
- [ ] **Image caching** via Cloudinary/S3
- [ ] A/B testing personality variations
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 📝 Design Decisions

| Decision | Why |
|----------|-----|
| Dark theme default | Luxury aesthetic, premium brand positioning |
| Glassmorphism UI | Modern, trendy 2024-2026 design language |
| Repository pattern | Future-proof for real Snaphomz API integration |
| No database | Zero infrastructure for hackathon — all computation is stateless |
| SessionStorage | Privacy-first — clears on tab close, no tracking |
| Fallback images | Demo NEVER breaks, regardless of API status |

---

## 👥 Team

Built for **Snaphomz Hackathon 2.0**

---

## 📄 License

MIT — Built with ❤️ for Snaphomz
