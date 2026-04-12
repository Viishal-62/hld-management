# 🧠 HLD Brain

**HLD Brain** is a premium, narrative-driven system design and high-level architecture learning platform. It transforms dry, academic backend concepts into engaging stories, practical deep-dives, and visual step-by-step flows.

This project was built to document the crucial architectural tradeoffs, networking protocols, databases, and structural abstractions that software engineers face when designing distributed systems at scale.

![HLD Brain Layout](https://picsum.photos/1200/600?tech) *(Placeholder for a hero screenshot!)*

## ✨ Features

- **Dark Mode Excellence:** A strict, premium "no-white" dark mode theme featuring glassmorphism effects, custom scrollbars, and vibrant category markers.
- **Story-Driven Learning:** Every concept attempts to teach complex paradigms (like partitioning or SSE) via real-world analogies and stories (e.g., *The Restaurant Chef*, *The Post Office*).
- **Deep Technical Context:**
  - `How It Works`: Step-by-step serialized execution flows.
  - `Deep Dives`: Intensive focus on specific gotchas like *Head-of-line Blocking*, *The Celebrity Problem*, or *Dirty Reads*.
  - `Tradeoffs`: Objective Pros & Cons (Latency vs Throughput, Consistency vs Availability).
  - `Real-World Examples`: Case studies of how companies like Stripe, Discord, and GitHub solve these problems.
- **Local Progress Tracking:** Mark topics as `Completed` or `Bookmarked`—fully synced to your local machine using strict `localStorage` persistence.
- **Cross-Referencing:** Every concept dynamically links to related system design principles to encourage rabbit-hole learning.

## 🛠 Tech Stack

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Layer:** Statically typed TypeScript configuration objects.
- **State Management:** Client-Side hooks (`useProgress`) binding directly to `localStorage`.

## 📂 Project Structure

```text
hld-management/
├── app/
│   ├── category/[id]/    # Views concepts filtered by category
│   ├── concept/[id]/     # Deep-dive view of a single concept
│   ├── bookmarks/        # Specialized view of saved/bookmarked concepts
│   ├── components/       # Reusable UI (DifficultyBadge, FlowDiagram, ConceptDetail)
│   ├── layout.tsx        # Root layout, handling HTML/Body dark-theme meshes
│   ├── page.tsx          # Home page & Category Grid
│   └── globals.css       # Core design tokens, CSS variables, global scrollbars
├── data/
│   ├── categories.ts     # Definition of the 10 core architectural pillars
│   ├── concepts.ts       # Database of 30+ heavily documented concepts
│   └── index.ts          # Helper utility functions for querying data
├── lib/
│   ├── types.ts          # Core TypeScript models (Concept, FlowStep, etc.)
│   └── use-progress.ts   # LocalStorage synchronization hook
└── (Standard NextJS dotfiles)
```

## 🚀 Getting Started

To run the application locally on your machine:

1. **Clone the repository** and ensure you have `Node.js` installed.
2. **Install dependencies** using your package manager (PNPM is recommended):

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm run dev
   ```

4. **Open your browser** and navigate to:
   [http://localhost:3000](http://localhost:3000)

## 📚 Content Library

HLD Brain is currently populated with extensively documented content across the following pillars of System Design:

- **Fundamentals:** Paging & Virtual Memory, Threads vs Processes, Single Point of Failure (SPOF), How the Internet Works.
- **Scaling:** Horizontal vs Vertical, Load Balancing (L4 vs L7), Auto-Scaling groups.
- **Microservices & Architecture:** Migrating to Microservices, Event Sourcing, CAP Theorem, Service Mesh.
- **Databases:** Relational vs NoSQL, Sharding, Data Partitioning, Isolation Levels, Schema Migration, Write-Ahead Logs (WAL).
- **Caching:** Caching Strategies (Read-Through, Write-Back), Memcached vs Redis, Distributed Rate Limiting.
- **Security:** Oauth 2.0 & JWT, SSO (SAML & OIDC), RBAC/ABAC/ACL Authorization, TLS/SSL.
- **Networking:** Push vs Pull Architecture, TCP vs UDP, WebSockets & SSE, Forward vs Reverse Proxies, CDNs.
- **System Design Practice Models:** Designing a URL Shortener, Designing a Newsfeed (Twitter), Designing Real-time Chat (WhatsApp).

## 📝 License

This project is built for educational tracking. Feel free to fork, expand the concept library, and use it as your personal system design roadmap.
