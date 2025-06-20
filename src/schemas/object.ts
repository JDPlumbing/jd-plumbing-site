// src/schemas/object.ts

export const schema = {
  name: "object",
  title: "Object",
  description: "Represents physical or digital things — tools, materials, fittings, or data.",
  fields: {
    type: "General category (e.g. part, pipe, permit, image)",
    form: "Geometry, dimensions, specs (e.g. 3/4\" PVC elbow, PDF layout)",
    state: "Current condition (e.g. available, damaged, flagged)",
    origin: "Where it came from (e.g. vendor, upload, trip)",
    usage: "References to scripts or jobs using this object",
  },
  usedBy: ["quote", "script", "rule", "job"],
}
