"use client";

import { use } from "react";
import Header from "../../components/Header";
import ConceptDetail from "../../components/ConceptDetail";
import { getConceptById } from "@/data";
import Link from "next/link";

export default function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const concept = getConceptById(id);

  if (!concept) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Concept Not Found
            </h1>
            <Link href="/" style={{ color: "var(--violet-500)" }} className="text-sm hover:underline">
              Go Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <ConceptDetail concept={concept} />
        </div>
      </main>
    </>
  );
}
