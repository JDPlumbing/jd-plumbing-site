// src/schemas/plan.ts

export const schema = {
  name: "plan",
  title: "Plan",
  description: "A multi-phase coordination capsule — job chains with constraints.",
  fields: {
    goal_type: "Objective type (e.g. retrofit, install, campaign)",
    phases: "Ordered or conditional job steps",
    constraints: "Access, parts, permits, approvals, etc.",
    status: "Progress state (e.g. not started, blocked, done)",
    handoff: "Final target or transition (e.g. dispatch, CRM, billing)",
  },
  usedBy: ["dispatch", "CRM", "training", "tracking"],
}
