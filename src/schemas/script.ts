// src/schemas/script.ts

export const schema = {
  name: "script",
  title: "Script",
  description: "Encodes procedures — from primitive actions to complex sequences.",
  fields: {
    zoom: "Granularity level (scrip1 to scrip9 or primitive → high-level)",
    actor: "Who executes the script",
    target: "What is acted upon",
    tool: "Tool or object used (symbolic ref)",
    flow: "Structure (e.g. linear, retry, conditional)",
    outcome: "Result (e.g. pass/fail, new state, symbolic label)",
  },
  usedBy: ["job", "rule", "training", "plan"],
}
