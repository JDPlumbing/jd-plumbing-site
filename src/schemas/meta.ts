// src/schemas/meta.ts

export const schema = {
  name: "meta",
  title: "Meta",
  description: "Tracks usage patterns, system errors, schema gaps, etc.",
  fields: {
    target: "What schema or system the metric refers to (actor, plan, etc.)",
    metric: "The type of insight (e.g. error rate, override count, usage)",
    mode: "Interpretation layer (e.g. trend, anomaly, flag, threshold)",
    alert: "Optional trigger or action (e.g. alert dev, suppress rule)",
    route: "Escalation or routing path (e.g. dashboard, retraining, ops)",
  },
  usedBy: ["schema evolution", "system reflection", "admin telemetry"],
}
