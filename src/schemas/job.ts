// src/schemas/job.ts

export const schema = {
  name: "job",
  title: "Job",
  description: "The task anchor. Tracks status, roles, scripts, and execution.",
  fields: {
    status: "Lifecycle phase (e.g. inquiry, quoted, booked, complete)",
    type: "Job class (e.g. diagnostic, install, upgrade, emergency)",
    assigned: "Actor ID responsible (symbolic)",
    linked: "Linked entities (e.g. quote, site, script, plan)",
    flags: "Contextual tags (e.g. supervision required, parts delay, special permit)",
  },
  usedBy: ["plan", "crm", "dashboard", "meta"],
}
