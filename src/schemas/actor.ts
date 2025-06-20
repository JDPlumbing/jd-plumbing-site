// src/schemas/actor.ts

export const schema = {
  name: "actor",
  title: "Actor",
  description: "Represents any human, AI, team, or toolset that can act.",
  fields: {
    id: "Unique symbolic reference (e.g. tech001, ai-agent, crew-lead)",
    role: "Function of the actor (e.g. technician, dispatcher, CRM-bot)",
    credentials: "Verifiable trust layer (e.g. license, badge, cert)",
    permissions: "What this actor is allowed to do (verbs or scopes)",
    history: "Optional behavior or interaction trace (logs, events, visits)",
  },
  usedBy: ["job", "script", "quote", "crm", "chat"],
}
