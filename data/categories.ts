import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "scaling",
    name: "Scaling",
    icon: "📈",
    description: "Techniques to handle growing traffic and data",
    color: "#6366f1",
  },
  {
    id: "database",
    name: "Database",
    icon: "🗄️",
    description: "Data storage, consistency, and query optimization",
    color: "#f59e0b",
  },
  {
    id: "caching",
    name: "Caching",
    icon: "⚡",
    description: "Speed up access with in-memory data strategies",
    color: "#22c55e",
  },
  {
    id: "messaging",
    name: "Messaging & Queues",
    icon: "📨",
    description: "Asynchronous communication between services",
    color: "#ec4899",
  },
  {
    id: "networking",
    name: "Networking",
    icon: "🌐",
    description: "APIs, protocols, and communication patterns",
    color: "#06b6d4",
  },
  {
    id: "security",
    name: "Security",
    icon: "🔒",
    description: "Protecting systems, data, and user access",
    color: "#ef4444",
  },
  {
    id: "architecture",
    name: "Architecture Patterns",
    icon: "🏗️",
    description: "System design patterns and structural approaches",
    color: "#8b5cf6",
  },
  {
    id: "reliability",
    name: "Reliability",
    icon: "🛡️",
    description: "Fault tolerance, monitoring, and system health",
    color: "#14b8a6",
  },
  {
    id: "storage",
    name: "Storage & CDN",
    icon: "💾",
    description: "File storage, object stores, and content delivery",
    color: "#f97316",
  },
  {
    id: "fundamentals",
    name: "Fundamentals",
    icon: "🧠",
    description: "Core computing, OS, and internet concepts",
    color: "#ca8a04",
  },
  {
    id: "tradeoffs",
    name: "Tradeoffs",
    icon: "⚖️",
    description: "Evaluating architectural compromises and constraints",
    color: "#a855f7",
  },
  {
    id: "practice",
    name: "System Design Practice",
    icon: "🎯",
    description: "Real-world system design interview guides",
    color: "#10b981",
  }
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
