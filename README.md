# 🩺 Dr.Appoinment — Modern Healthcare Frontend (Next.js 15, React 19, Tailwind CSS)

An end-to-end medical appointment scheduling and clinical triage frontend built according to the **Dr.Appoinment Frontend Development & API Integration Guide**, tailored for **SEO & AI SEO (GEO / Generative Engine Optimization)** with complete **Indian healthcare context (NMC compliance, Indian names, ₹ INR pricing, Indian emergency services 112/108, top medical institutions like AIIMS, CMC Vellore, NIMHANS)**.

---

## 🚀 Key Highlights & Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org) + [React 19](https://react.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + Lucide Icons + custom medical theme
- **Client State**: [Zustand](https://github.com/pmndrs/zustand) for authentication & tokens
- **HTTP Client**: [Axios](https://axios-http.com) with automatic JWT Bearer injection & 401 interceptor
- **AI Integration**: Floating **Dr.Appoinment AI Assistant** powered by Spring AI & Google Gemini (`/api/chat`)

---

## 🌐 SEO & AI SEO (Generative Engine Optimization) Architecture

1. **Schema.org JSON-LD Structured Data**:
   - `MedicalClinic` / `MedicalBusiness` on homepage and layout
   - `Physician` rich snippet schema on every Doctor profile (`/doctors/[id]`)
   - `FAQPage` schema on the homepage (ideal for Google rich snippets and ChatGPT / Perplexity search answers)
   - `BreadcrumbList` schema for hierarchical navigation
2. **AI Search Engine Indexing (`/llms.txt`)**:
   - Implements the new `/llms.txt` standard for LLM crawlers (PerplexityBot, GPTBot, ClaudeBot, Google-Extended).
3. **Robots & Sitemap**:
   - Dynamic `/robots.txt` allowing public routes and AI search crawlers.
   - Dynamic `/sitemap.xml` for search indexation.
4. **Semantic HTML5**:
   - Structured `<article>`, `<section>`, `<nav>`, `<header>`, and `itemScope`/`itemType` annotations.

---

## 📁 Project Directory Structure

```text
Dr.appoinment_frontend/
├── src/
│   ├── api/                   # All 49 REST endpoints mapped
│   │   ├── client.ts          # Axios with JWT Bearer interceptor & error handling
│   │   ├── auth.ts            # Login, register, me
│   │   ├── doctors.ts         # Doctor listing, profile, availability & slots
│   │   ├── appointments.ts    # Booking, cancel, reschedule, status
│   │   ├── prescriptions.ts   # Prescription issue, view, get by patient/doctor
│   │   ├── reviews.ts         # Review creation, doctor rating summary
│   │   ├── patients.ts        # Patient records CRUD
│   │   └── chat.ts            # Spring AI / Gemini chatbot endpoint
│   ├── app/
│   │   ├── layout.tsx         # Root layout with SEO Schema, Navbar, Chat, Footer
│   │   ├── page.tsx           # High-converting Landing page with FAQPage schema
│   │   ├── doctors/
│   │   │   ├── page.tsx       # Doctor Discovery with multi-filter search
│   │   │   └── [id]/page.tsx  # Doctor Profile & interactive Slot Picker
│   │   ├── patient/page.tsx   # Patient Portal (My appointments, reschedule, Rx)
│   │   ├── doctor/page.tsx    # Doctor Practice Portal (Daily schedule, issue Rx)
│   │   ├── login/page.tsx     # Authentication
│   │   ├── register/page.tsx  # Registration with role selection
│   │   ├── robots.ts          # SEO & AI Bot directives
│   │   ├── sitemap.ts         # Automated sitemap
│   │   └── llms.txt/route.ts  # LLM text endpoint for AI search engines
│   ├── components/
│   │   ├── chat/              # DrAppoinment Floating AI Chat Widget
│   │   ├── doctors/           # DoctorCard, FilterBar, SlotPicker
│   │   ├── appointments/      # BookingModal, RescheduleModal
│   │   ├── reviews/           # ReviewModal (1-5 star ratings)
│   │   ├── prescriptions/     # PrescriptionModal (electronic Rx view & issue)
│   │   ├── layout/            # Navbar, Footer
│   │   └── seo/               # JsonLd schema renderer
│   ├── store/
│   │   └── useAuthStore.ts    # Zustand auth store
│   └── types/
│       └── index.ts           # Type definitions matching Spring Boot DTOs
├── .env.local                 # Configured with NEXT_PUBLIC_API_URL=http://localhost:8080
└── package.json
```

---

## 🏃 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```
