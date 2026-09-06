# KaushalSetu 🛠️

## Mobile App

The Vite frontend is connected to Capacitor with an Android project in `ps89/android`.

From the `ps89` directory:

```bash
npm install
npm run cap:sync
npm run cap:open
```

`cap:sync` rebuilds the web app and copies it into the native project. `cap:open` opens Android Studio, where the app can be run on an emulator or connected Android device. Android Studio and an Android SDK are required for native builds.

**Digitizing India's Labour Cooperatives — Trust Inherited, Not Reinvented.**

> SIH 2026 Submission

KaushalSetu is a household & institutional services platform that connects verified cooperative workers (plumbers, electricians, caregivers, cleaners) with customers — without reinventing trust from scratch. Instead of verifying workers from zero like commercial gig platforms, KaushalSetu **inherits verification** already done by registered Labour Cooperative Societies and their federations, the same way Amul trusts a local dairy society's quality checks instead of testing every farmer's milk individually.

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Proposed Solution](#-proposed-solution)
- [Why Not a Generic Gig App](#-why-not-a-generic-gig-app)
- [How It Works](#-how-it-works)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Feasibility & Challenges](#-feasibility--challenges)
- [Impact](#-impact)
- [Beyond Households — Institutional Bookings](#-beyond-households--institutional-bookings)
- [Government Alignment](#-government-alignment)
- [References](#-references)

---

## 🧩 Problem Statement

Search "plumber near me" in any Indian city and Urban Company, Housejoy, or a random local ad shows up first — even though a registered Labour Cooperative Society, full of verified and accountable workers, may be running two streets away.

- **Skilled, trustworthy workers already exist.** They just have no digital discovery layer.
- **Commercial gig platforms solve discovery but create a new problem** — 20–30% commissions and zero ownership for workers.

The real gap isn't worker quality. It's **digital reach** on one side and **platform ownership** on the other. KaushalSetu closes both gaps at once, without verifying a single worker from scratch.

---

## 💡 Proposed Solution

On the surface, KaushalSetu looks like a typical services app: search, book, track, pay, rate. Underneath, three things are structurally different:

1. **Closed registration** — Only cooperative-verified workers can join, using a registration code issued by a cooperative admin.
2. **90/10 split** — Workers keep ~90% of every payment; the remaining 10% funds a transparent, visible welfare fund (not company margin).
3. **Real governance** — Cooperative members vote on platform decisions (pricing, welfare fund usage) through a built-in polling module.

### Where the Trust Comes From

```
Individual Worker (Plumber, Electrician, Caregiver...)
        ↓ joins
Local Labour Cooperative Society (verifies skill)
        ↓ is a member of
State / National Federation (e.g. NLCF)
        ↓ partners with
KaushalSetu Platform (lists ONLY federation-verified workers)
```

We never verify a worker from scratch — we inherit the trust the cooperative and federation have already built.

---

## 🎯 Why Not a Generic Gig App

Building "Urban Company but cheaper" and opening registration to anyone would be easy — and wrong for this brief. The problem statement is about **digitizing existing labour cooperatives**, not expanding the open gig economy.

A worker literally **cannot register without a code from a real cooperative admin.** This restriction is the whole point — it's what stops KaushalSetu from becoming just another commission-charging aggregator with a fresh coat of paint.

---

## 🔄 How It Works

### The Booking Flow

```
Household Searches a Service ("plumber near Gwalior")
        ↓
Platform Finds Workers Nearby (Haversine distance, ≤5km, verified only)
        ↓
Matched Workers Get Notified (push notification, first to accept wins)
        ↓
Worker Accepts & Travels (live location tracked on map)
        ↓
OTP Verification on Arrival (confirms the right person, job starts)
        ↓
Job Done → Pay → Rate (90/10 ledger, two-way rating, invoice)
```

### Three Journeys, One Platform

| Journey | Role | What They Do |
|---|---|---|
| **A — Household** | Customer | Signs up (phone + OTP), searches verified workers, books/tracks/pays/rates a job |
| **B — Worker** | Cooperative member | Signs up with a cooperative code, goes "available," accepts jobs, verifies OTP, sees 90% earnings, votes in polls |
| **C — Cooperative Admin / Federation** | Governance & ops | Issues codes, approves workers, manages welfare fund, runs polls, views transparency ledger |

---

## ⭐ Key Features

| # | Feature | Description |
|---|---|---|
| 1 | **Worker Registration & Verification** | Admin-only signup with cooperative ID, skill category, certificate upload |
| 2 | **Registration-Code Gate** | 6-character code, tied to a phone number, single-use, issued only by a cooperative admin |
| 3 | **Skill Profiles & Certificates** | Photo, skill tags, experience, certificate, cooperative badge |
| 4 | **Customer Booking Calendar** | Date/time-slot picker |
| 5 | **Location-Based Matching** | Haversine distance math, no AI required |
| 6 | **Emergency / On-Demand Booking** | "Book Now" broadcasts to all available workers in radius instantly |
| 7 | **OTP-Verified Job Start** | 4-digit OTP confirms the right worker arrived |
| 8 | **Payments & Invoices (Simulated)** | Mock transaction, 90/10 split, downloadable invoice via jsPDF |
| 9 | **Two-Way Ratings** | Public rating for workers; private, admin-only environment rating from workers |
| 10 | **Worker Insurance / Welfare Fund** | 10% auto-routed to a visible welfare fund + claims form |
| 11 | **Worker Safety Tools** | Live-location sharing to emergency contact/admin + in-job SOS button |
| 12 | **Live Location Tracking** | Real-time updates via Firebase Realtime Database / Supabase Realtime |
| 13 | **Cooperative Admin Dashboard** | Worker list, verification queue, welfare fund, booking stats, governance panel |
| 14 | **Governance & Polling** | Admins post questions; members vote; results shown live |
| 15 | **AI-Based Demand Forecasting** | Booking data grouped by day/hour/area into a bar chart (honestly framed as a GROUP BY query, not ML) |
| 16 | **Multi-Language Toggle** | `react-i18next` with Hindi, English, and a regional language |
| 17 | **Chatbot / Voice Assistant** | Built on **Bhashini** (Govt. of India's ASR–NMT–TTS pipeline) for a guided FAQ bot |

---

## 🛠 Tech Stack

### Hackathon Prototype (PWA)

| Layer | Technology |
|---|---|
| Frontend | React + Vite, Tailwind CSS |
| Backend & Auth | Firebase (Auth, Firestore, Storage) or Supabase, phone-based OTP login |
| Maps & Location | Leaflet.js + OpenStreetMap or Google Maps JS API (free tier) |
| Charts | Recharts or Chart.js |
| Invoices | jsPDF |
| Multi-language | react-i18next (Hindi, English, one regional language) |
| Hosting | Firebase Hosting or Vercel |

### Production Roadmap

- **Mobile:** React Native (Expo)
- **Database:** PostgreSQL via Supabase
- **Real-time:** Socket.io or Supabase Realtime
- **Payments:** Razorpay Route or Cashfree Easy Split (for legally compliant multi-party payment splitting — no custom-built payment logic)

---

## 🧠 Feasibility & Challenges

| Challenge | How KaushalSetu Addresses It |
|---|---|
| Funding & scaling a worker base from zero | Plugs into existing cooperatives with already-verified, organized members |
| Cooperatives lack technology, not workers | Off-the-shelf tools (Firebase/Supabase, Leaflet, Bhashini) keep costs low |
| Payment-splitting must be legally compliant | Routed through RBI-recognized aggregators (Razorpay Route, Cashfree Easy Split) |
| Cooperative admins are often not tech-savvy | Dashboard kept simple and task-focused, not feature-dense |
| Worker safety in someone's home | OTP-gated job start + in-job SOS button with live location to admin/emergency contact |
| Protecting workers without publicly shaming customers | Workers rate the environment privately; repeated low scores trigger internal admin review only |

---

## 📈 Impact

India's gig and platform workforce is growing fast, largely without ownership or safety nets. Per **NITI Aayog's 2022 report**, the workforce is projected to nearly triple — from ~7.7 million workers in 2020–21 to ~23.5 million by 2029–30 (1.5% → 4.1% of India's total workforce).

| Stat | Detail |
|---|---|
| **44,143** | Labour cooperatives under NLCF, with 27.3 lakh worker-members nationwide |
| **20–30%** | Commission a worker typically loses on commercial platforms — vs ~10% on KaushalSetu |
| **2.2 lakh+** | Drivers already using Yatri, a zero-commission platform cooperative in Kochi |

### The Transparency Ledger, Made Concrete

On a ₹500 plumbing job:
- **Typical commercial platform:** Worker sees ₹350–₹400, with no visibility into the calculation.
- **KaushalSetu:** ₹450 to the worker, ₹50 to the welfare fund — both numbers shown on screen.

### A Working Precedent, Not a Theory

In Kochi, the **Kochi Metropolitan Transport Authority** launched **Yatri**, a zero-commission ride platform on the Beckn open protocol, now used by 2.2+ lakh drivers and ~46 lakh customers. It directly inspired **Namma Yatri** in Bengaluru. If a state transport authority can run a zero-commission, driver-owned platform at this scale, a cooperative-backed household services platform is a realistic next step.

---

## 🏢 Beyond Households — Institutional & Community Bookings

Households are the entry point, not the ceiling. The same verified worker pool serves a larger customer type: **institutions** — schools, hospitals, offices, apartment societies, and NGOs needing specialists or teams on a recurring basis.

- **Institutional Accounts** — Verified organization profiles (school, hospital, RWA, NGO) with their own onboarding
- **Team Bookings** — Cooperative admin assigns and guarantees a full team, not a single "first-to-accept" worker
- **Contract & Recurring Scheduling** — AMC-style repeating bookings with their own calendar/renewal logic
- **Institutional Billing** — Consolidated monthly, GST-compliant invoices distinct from instant pay-per-job flow

The household flow proves the trust model works for one booking; the institutional flow is where it becomes recurring revenue for cooperatives at scale.

---

## 🏛 Government Alignment

| Body / Initiative | Relevance |
|---|---|
| **National Labour Cooperatives Federation (NLCF)** | Apex body (est. 1981) representing 44,000+ labour cooperatives across 215 district and 17 state-level federations. KaushalSetu is a digital extension, not a replacement. |
| **Ministry of Cooperation** | Union Ministry (est. July 2021), mission "Sahkar se Samriddhi" — KaushalSetu's mission maps directly onto its mandate |
| **Digital India / Bhashini** | Chatbot built on government's own multilingual AI pipeline — trusted infrastructure, not a closed foreign stack |
| **Yatri & AuSa, Kochi** | State-government-backed platform cooperatives already proving this ownership model works at scale |

---

## 📚 References

1. National Labour Cooperatives Federation of India (NLCF) — apex body established 1981
2. Ministry of Cooperation, Government of India — [cooperation.gov.in](https://cooperation.gov.in), established 6 July 2021
3. NITI Aayog, *"India's Booming Gig and Platform Economy: Perspectives and Recommendations on the Future of Work,"* 2022
4. Periodic Labour Force Survey (PLFS), Ministry of Statistics and Programme Implementation ([mospi.gov.in](https://mospi.gov.in))
5. OECD, *"Platform Cooperatives — Supporting the Public Transportation Network: Yatri and AuSa,"* OECD Toolkit for the Social Economy
6. Kochi Metropolitan Transport Authority (KMTA) / Open Kochi — Yatri and AuSa platform cooperative case study
7. Namma Yatri — zero-commission driver platform, Bengaluru, inspired directly by Yatri, Kochi

---

<p align="center">Built for <strong>Smart India Hackathon 2026</strong> 🇮🇳</p>
