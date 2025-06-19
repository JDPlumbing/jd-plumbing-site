---
title: quip_v1.3.md
category: actor 
status: stable
---

## Capsule: `quip`

**Purpose:** Encodes actor intent, approach, identity, and cognitive posture. This version integrates symbolic UID tracking and identity capsule linkages to enable reflective, audit-ready behavioral modeling.

```yaml
uid_ref: traceN        # Links this quip to a symbolic actor lineage
identity_ref: profileN  # Points to a stable role or user style
origin_ref: originN     # Describes how this actor context was invoked
key_ref: keyN           # Optional signature to authenticate intent
```

---

## Byte Layout (4 bytes / 32 bits, 8 x 4-bit fields)

### 🧐 Byte 1 — Motivation + Strategy

| Bits | Field             | Description                                  |
|------|-------------------|----------------------------------------------|
| 0–3  | `intent_class`    | Diagnose, Repair, Replace, Install, Remove, Bypass, Inspect, Upgrade, Clean, Fabricate |
| 4–7  | `strategy_bias`   | Fastest, Cheapest, Code-minimum, Visual-clean, Least-invasive, Overkill, Familiar, Delegated |

### 🧰 Byte 2 — Role + Risk

| Bits | Field             | Description                                  |
|------|-------------------|----------------------------------------------|
| 0–3  | `labor_class`     | Laborer, Helper, Apprentice, Technician, Plumber, Foreman, Master, Inspector, Code Officer, Homeowner |
| 4–7  | `risk_profile`    | Failsafe, Standard, Aggressive, Stealth, Overbuild, Expedient, Cowboy, Showoff |

### 🗣️ Byte 3 — Communication + Supervision

| Bits | Field               | Description                              |
|------|---------------------|------------------------------------------|
| 0–3  | `communication_mode`| Silent / Solo, Verbal, Visual (gesture), Remote / Radio, Text / Notes |
| 4–7  | `supervision_state` | Unsupervised, Under supervision, Co-working, Audited / Recorded |

### 🧠 Byte 4 — Cognitive State + Reserved

| Bits | Field             | Description                              |
|------|-------------------|------------------------------------------|
| 0–3  | `cognitive_state` | Focused, Distracted, Fatigued, Multitasking, Overwhelmed, Relaxed, Waiting, Anticipatory |
| 4–7  | `reserved`        | Future: delegation, tool bias, confidence |

---

## 🔗 Integration Notes

- Fully compatible with symbolic actor tracking (`traceN`, `profileN`, `originN`, `keyN`)
- Can be embedded in or referenced by `chatN`, `jobN`, `reflectN`, or `memoN`
- Behaviorally seeded from `profileN`, refined via `reflectN`
- Suitable for procedural simulation and actor-aware tooling

---

## ✅ Status

| Feature                             | State |
|-------------------------------------|--------|
| Byte ordering and nibble sizing     | ✅     |
| Behavioral field integrity          | ✅     |
| Identity capsule support integrated | ✅     |
| Ready for agent/actor simulation    | ✅     |
