---
title: schemaN_v1.2.md
category: logic capsule
status: stable
--------------

**Schema Awareness + Capability Mapping Capsule**
**Version:** v1.2
**Size:** 2–4 bytes per schema record
**Zoom Level:** Meta-awareness of system knowledge and capability

```yaml
uid_ref: traceN  # Symbolic UID linkage for self-modeling or upgrade tracking
profile_ref: profileN  # Agent self-schema
origin_ref: originN  # Source lineage reference
key_ref: keyN  # Capability access keys
agent_ref: agentN  # Who owns/uses this schema
badge_ref: badgeN  # Authority or certification marks
```

---

## 🧠 Overview

`schemaN` encodes what the agent *believes it knows* — and where its boundaries are.

Use cases:

* Agent self-assessment (“Can I quote this?”)
* Reflective reasoning across capsule coverage
* Training gap identification
* Version-aware execution and fallback strategies

> **Note:** Early naming conventions emphasized short, rhyming labels (e.g. `clip`, `quip`, `snip`, `trip`). As the ecosystem expanded, some capsule names (like `snipN`) were deprecated or merged for clarity. For instance, `senseN` now handles signal detection logic originally envisioned under `snipN`. Future modules should prioritize semantic clarity over naming symmetry.

---

## 🔣 Byte Layout

### Byte 1 — `capsule_ref` + `coverage_flag`

| Bits | Field           | Description                           |
| ---- | --------------- | ------------------------------------- |
| 0–3  | `capsule_ref`   | Which capsule this refers to          |
| 4–7  | `coverage_flag` | How complete or trusted the schema is |

#### `capsule_ref`

| Value | Capsule ID |
| ----- | ---------- |
| 0000  | dripN      |
| 0001  | quoteN     |
| 0010  | ruleN      |
| 0011  | tripN      |
| 0100  | faultN     |
| 0101  | chatN      |
| 0110  | jobN       |
| 0111  | Other      |

#### `coverage_flag`

| Value | Schema Confidence Level |
| ----- | ----------------------- |
| 0000  | Incomplete              |
| 0001  | Provisional             |
| 0010  | Stable                  |
| 0011  | Comprehensive           |
| 0100  | Redundant / Overlapping |
| 0101  | Obsolete                |
| 0110  | Human-Synced            |
| 0111  | Unknown                 |

---

### Byte 2 — `version_bin` + `schema_depth`

| Bits | Field          | Description                 |
| ---- | -------------- | --------------------------- |
| 0–3  | `version_bin`  | Schema versioning flag      |
| 4–7  | `schema_depth` | How deep the knowledge runs |

#### `version_bin`

| Value | Version Class      |
| ----- | ------------------ |
| 0000  | v1.0               |
| 0001  | v1.1 or patch      |
| 0010  | v2.0 major         |
| 0011  | Unversioned        |
| 0100  | Shadow or internal |
| 0101  | Draft              |
| 0110  | Legacy             |
| 0111  | Unknown            |

#### `schema_depth`

| Value | Knowledge Resolution     |
| ----- | ------------------------ |
| 0000  | Surface Keywords Only    |
| 0001  | Structural Tags Known    |
| 0010  | Bytecode Supported       |
| 0011  | Relational Logic Trained |
| 0100  | Reflex-Level Integrated  |
| 0101  | Partial Interpretations  |
| 0110  | Known Gaps Present       |
| 0111  | Unknown                  |

---

## ✅ Status

| Feature                                | State |
| -------------------------------------- | ----- |
| Capsule-level schema awareness         | ✅     |
| Confidence, version, and depth tagging | ✅     |
| Self-diagnostic and fallback support   | ✅     |
| Trainability signal for reflectN       | ✅     |
| Symbolic trace integration (UID patch) | ✅     |
