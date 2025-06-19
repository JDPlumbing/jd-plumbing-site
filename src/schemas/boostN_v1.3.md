---
title: boostN_v1.3.md
category: economic capsule
status: stable
---

## Capsule: `boostN`

**Purpose:** Tracks performance outcomes, strategic modifiers, and field incentives. Enables behavioral economics across service execution, with full symbolic linkage to traceable identity and system reflex chains.

```yaml
uid_ref: traceN         # Unique symbolic ID for this incentive
source_profile: profileN  # Identity of the agent/human receiving or triggering the boost
source_origin: originN     # Source method/context for incentive (e.g., CRM rule, job audit)
source_key: keyN           # Optional cryptographic credential
```

---

## 🚀 Overview

`boostN` tracks structured incentives and penalties that influence behavior or economics. These are explicitly encoded and can be applied to:
- Quotes, jobs, or actors
- Events, locations, CRM entities
- Reward or penalize performance, safety, speed, revenue, loyalty

---

## 🔣 Byte Layout (4 bytes / 32 bits)

### Byte 1 — Modifier Type + Target

| Bits | Field        | Description |
|------|--------------|-------------|
| 0–3  | `boost_type` | Speed Bonus, Accuracy Bonus, Upsell Bonus, Safety Modifier, Risk Penalty, Surge Boost, Loyalty Bonus, Penalty (delay/fault) |
| 4–7  | `target_ref` | quoteN, jobN, actor/teamN, client/CRM, eventN, product (dripN), location/mapN zone, Unknown |

### Byte 2 — Value Tier + Trigger Source

| Bits | Field           | Description |
|------|------------------|-------------|
| 0–3  | `value_tier`     | Nominal, Moderate, High, Exceptional, Critical, System-Suppressed, Pending Valuation, Unknown |
| 4–7  | `trigger_mode`   | Manual Override, RuleN Trigger, quoteN threshold, eventN time, faultN audit pass, chatN rating, repeat job/loyalty, Unknown |

### Byte 3 — Duration + Reflex

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `duration_flag`   | One-Time, Job-Scoped, Weekly, Monthly, Until Revoked, Trial Window, Event-Synced, Unknown |
| 4–7  | `reflex_action`   | Add invoice line, Escalate, Dashboard flag, Adjust quote cost, Mark actor, Learn penalty, Log to reflectN, No Action |

---

## 🔗 Integration Notes

- `boostN` capsules can be injected or triggered via `eventN`, `quoteN`, `jobN`, `faultN`, or `reflectN`
- Symbolic linkages use `traceN` and may reference source identity (`profileN`, `originN`, `keyN`)
- Reflex output may impact pricing (`billN`), dispatch eligibility, escalation (`metaN`), or AI learning (`learnN`)

---

## ✅ Status

| Feature                                        | State |
|------------------------------------------------|--------|
| Symbolic incentive logic                       | ✅     |
| Identity capsule references (profile, origin)  | ✅     |
| Economic intensity and reflex behavior fields  | ✅     |
| Capsule target versatility                     | ✅     |
| Time-based and conditional incentives          | ✅     |
