// src/schemas/event.ts

export const schema = {
  name: "event",
  title: "Event",
  description: "Represents any symbolic change or update to state.",
  fields: {
    source: "Who or what triggered the change (actor, system, sensor)",
    target: "What was affected (job ID, script ref, quote slug, etc.)",
    type: "Nature of event (e.g. created, updated, failed, flagged)",
    confidence: "Confidence score (0–100) in the event’s accuracy",
    reflex: "Trigger behavior (e.g. immediate, delayed, suppressed)",
  },
  usedBy: ["dashboard", "reflection", "retraining"],
}
