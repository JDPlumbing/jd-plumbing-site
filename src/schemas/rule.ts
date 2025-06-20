// src/schemas/rule.ts

export const schema = {
  name: "rule",
  title: "Rule",
  description: "Encodes constraints — safety, code, logic, or business.",
  fields: {
    domain: "Context (e.g. building code, business logic, permissions)",
    target: "Applies to (e.g. object, actor, script, site)",
    outcome: "Result (e.g. pass, fail, inspect, escalate, block)",
    scope: "Jurisdiction or coverage (e.g. county, company, AHJ)",
    triggers: "Condition or action that activates the rule",
  },
  usedBy: ["job", "plan", "quote", "training"],
}
