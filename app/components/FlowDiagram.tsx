"use client";

import type { FlowStep } from "@/lib/types";

interface Props {
  steps: FlowStep[];
  accentColor?: string;
}

export default function FlowDiagram({ steps, accentColor = "var(--violet-500)" }: Props) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Vertical line */}
          {i < steps.length - 1 && (
            <div
              className="absolute left-[17px] top-10 bottom-0 w-[2px]"
              style={{ background: `linear-gradient(to bottom, ${accentColor}40, ${accentColor}10)` }}
            />
          )}

          {/* Step number circle */}
          <div
            className="w-[36px] h-[36px] rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 z-10"
            style={{
              background: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {i + 1}
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {step.title}
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
