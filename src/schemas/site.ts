// src/schemas/site.ts

export const schema = {
  name: "site",
  title: "Site",
  description: "Encodes spatial and environmental context — the 'where'.",
  fields: {
    location: "GPS, symbolic, or textual reference",
    geometry: "Boundaries, access points, layout",
    conditions: "Hazards, constraints, or access rules",
    status: "Inspection or readiness state (e.g. approved, blocked)",
    linked_jobs: "Job history or task references at this site",
  },
  usedBy: ["trip", "plan", "rule", "quote", "script"],
}
