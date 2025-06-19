---
title: metaN_v1.2.md
category: logic capsule
status: stable
---

## Capsule: `metaN`

**Purpose:** Encodes rollup metrics, capsule usage stats, and systemic feedback for reflex loops, retraining, dashboards, and schema evolution.

```yaml
uid_ref: traceN           # Signal trace reference
source_profile: profileN  # Who generated the metric / signal
origin_ref: originN       # Where the signal was produced or captured
key_ref: keyN             # Optional trust credential or validation anchor
```

---

## 📈 Overview
`metaN` is the **analytics + telemetry capsule**. It links symbolic observations, capsule health checks, usage metrics, and reflection targets across the drippy_ai system.

Used for:
- Feedback to `reflectN`, schema tuners, and dashboard renderers
- Triggering schema upgrades, retraining, or suppression logic
- Anchoring insight over time and region

---

## 🔣 Byte Layout (4 bytes)

### Byte 1 — Target + Rollup Scope
| Bits | Field         | Description                             |
|------|----------------|-----------------------------------------|
| 0–3  | `target_type`  | Which capsule type this feedback applies to |
| 4–7  | `rollup_mode`  | Time or grouping method                |

#### `target_type`
- 0000: `quoteN`
- 0001: `ruleN`
- 0010: `chatN`
- 0011: `scrip`
- 0100: `phaseN`
- 0101: `jobN`
- 0110: `grip` / `trip`
- 0111: System-Wide

#### `rollup_mode`
- 0000: Per Job
- 0001: Per Actor (quip.id)
- 0010: Per Day
- 0011: Per Week
- 0100: Per Phase Class
- 0101: Per Client
- 0110: Per Region / Zone
- 0111: Continuous / Rolling

---

### Byte 2 — Metric + Operation
| Bits | Field         | Description                  |
|------|----------------|------------------------------|
| 0–3  | `metric_type`  | What is being measured       |
| 4–7  | `stat_mode`    | How the result is calculated |

#### `metric_type`
- 0000: Usage Frequency
- 0001: Error Count
- 0010: Time-to-Complete
- 0011: Rejection / Drop Rate
- 0100: Rule Firing Rate
- 0101: Confidence Variability
- 0110: Script Override Rate
- 0111: Emotion-Triggered Escalation

#### `stat_mode`
- 0000: Count
- 0001: Min/Max
- 0010: Mean
- 0011: Std Dev
- 0100: Frequency Histogram
- 0101: Failure Percentage
- 0110: NPS / Rating Proxy
- 0111: Trendline Delta

---

### Byte 3 — Alert + Feedback Routing
| Bits | Field           | Description                        |
|------|------------------|------------------------------------|
| 0–3  | `alert_flag`      | Should it trigger system action?  |
| 4–7  | `feedback_mode`   | Where it routes the metric         |

#### `alert_flag`
- 0000: No Alert
- 0001: Warning Only
- 0010: Escalate to ReflectN
- 0011: Nudge Human Review
- 0100: CRM Flag
- 0101: Trigger Schema Revision
- 0110: Suppress Job/Quote
- 0111: Queue for Retraining

#### `feedback_mode`
- 0000: Supervisor View
- 0001: CLI Agent Summary
- 0010: Chat Recap / Follow-up
- 0011: CRM Dashboard
- 0100: ReflectN Trigger
- 0101: Developer Log
- 0110: System Policy Engine
- 0111: Schema Proposer

---

### Byte 4 — Capsule Ref + Time Scope
| Bits | Field             | Description                             |
|------|-------------------|-----------------------------------------|
| 0–3  | `capsule_ref_id`   | Local index if scoped to a specific capsule |
| 4–7  | `time_scope`       | Time window for metric application     |

#### `time_scope`
- 0000: Hour
- 0001: Day
- 0010: Week
- 0011: Month
- 0100: Quarter
- 0101: Year
- 0110: Custom Range
- 0111: Undefined

---

## ✅ Status
| Feature                               | State |
|---------------------------------------|--------|
| Rollup + feedback for all capsule types | ✅     |
| Alerts + system hooks supported         | ✅     |
| ReflectN and training loop integration  | ✅     |
| Trust and telemetry linkage             | ✅     |
| Identity capsule references embedded    | ✅     |