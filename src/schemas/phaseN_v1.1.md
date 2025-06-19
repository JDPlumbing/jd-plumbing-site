---
title: phaseN_v1.1.md
category: operational capsule
status: stable
--------------

## Capsule: `phaseN`

**Purpose:** Defines symbolic task steps within a job. Tracks job progress, execution logic, fallback paths, and priority.

```yaml
uid_ref: traceN       # Optional UID for long-lived or revisited phases
profile_ref: profileN # Author or schema source
origin_ref: originN   # System or method lineage
key_ref: keyN         # Access condition or phase-specific trigger
agent_ref: agentN     # Responsible executor or system actor
badge_ref: badgeN     # Certification or operational tag
```

---

## 📝 Overview

Each `phaseN` represents a structured step within a job. Capsules are chained in sequence, each gated by logic or context. Core to procedural execution in agent-based plumbing workflows.

---

## 🔓 Byte Layout (5–6 bytes)

### Byte 1 — `phase_id` + `phase_role`

| Bits | Field        | Description                       |
| ---- | ------------ | --------------------------------- |
| 0–3  | `phase_id`   | Step ID in job context            |
| 4–7  | `phase_role` | Diagnostic, Action, Wrap-up, etc. |

#### `phase_role`

| Value | Role Type           |
| ----- | ------------------- |
| 0000  | Diagnostic          |
| 0001  | Quoting / Estimate  |
| 0010  | Physical Action     |
| 0011  | Inspection / Verify |
| 0100  | Cleanup / Wrap-up   |
| 0101  | Reporting / Handoff |
| 0110  | Pause / Delay       |
| 0111  | Meta / Training     |

---

### Byte 2 — `scrip_ref` + `rule_ref`

| Bits | Field       | Description              |
| ---- | ----------- | ------------------------ |
| 0–3  | `scrip_ref` | Linked `scrip` task      |
| 4–7  | `rule_ref`  | Gating logic via `ruleN` |

> Local pointers or indexed references only.

---

### Byte 3 — `readiness_flag` + `outcome_gate`

| Bits | Field            | Description                       |
| ---- | ---------------- | --------------------------------- |
| 0–3  | `readiness_flag` | Entry gate for this phase         |
| 4–7  | `outcome_gate`   | How phase completion is confirmed |

#### `readiness_flag`

| Value | Entry Trigger              |
| ----- | -------------------------- |
| 0000  | Always Ready               |
| 0001  | Field Inspection Confirmed |
| 0010  | Material Delivered         |
| 0011  | Customer Approved          |
| 0100  | Schedule Window Open       |
| 0101  | Environment Cleared        |
| 0110  | Sensor OK                  |
| 0111  | Quote Accepted             |

#### `outcome_gate`

| Value | Completion Signal    |
| ----- | -------------------- |
| 0000  | Manual Confirm       |
| 0001  | Scrip Log Success    |
| 0010  | Sensor Verified      |
| 0011  | Photo Uploaded       |
| 0100  | RuleN Pass           |
| 0101  | Client Signed        |
| 0110  | Supervisor Validated |
| 0111  | External Confirm     |

---

### Byte 4 — `next_phase` + `fallback_phase`

| Bits | Field            | Description             |
| ---- | ---------------- | ----------------------- |
| 0–3  | `next_phase`     | Success path ID         |
| 4–7  | `fallback_phase` | Failure / retry path ID |

> Enables branching, recovery, and retry strategies.

---

### Byte 5 (Optional) — `time_class` + `priority_flag`

| Bits | Field           | Description                    |
| ---- | --------------- | ------------------------------ |
| 0–3  | `time_class`    | Duration estimate or SLA class |
| 4–7  | `priority_flag` | Urgency or escalation tier     |

#### `time_class`

| Value | Estimate  |
| ----- | --------- |
| 0000  | < 15 min  |
| 0001  | 15–30 min |
| 0010  | 30–60 min |
| 0011  | 1–2 hours |
| 0100  | Half-day  |
| 0101  | Full-day  |
| 0110  | Multi-day |
| 0111  | Variable  |

#### `priority_flag`

| Value | Priority           |
| ----- | ------------------ |
| 0000  | Normal             |
| 0001  | Time Sensitive     |
| 0010  | High Stakes        |
| 0011  | Customer Escalated |
| 0100  | System Critical    |
| 0101  | Follow-up Required |
| 0110  | Dormant            |
| 0111  | Backlogged         |

---

## ✅ Status

| Feature                       | State |
| ----------------------------- | ----- |
| Byte logic complete           | ✅     |
| Gate + outcome awareness      | ✅     |
| Retry path and failover logic | ✅     |
| Time and priority extensions  | ✅     |
| Identity capsules integrated  | ✅     |
