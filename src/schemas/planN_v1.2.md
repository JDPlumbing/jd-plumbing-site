---
title: planN_v1.2.md
category: operational capsule
status: stable
--------------

## Capsule: `planN`

**Purpose:** Encodes multi-phase, constraint-aware planning logic for outcome-driven jobs and agent-led workflows. Anchors high-level execution structure, goal context, gating conditions, and reference logic.

```yaml
uid_ref: traceN       # Symbolic plan lineage
profile_ref: profileN # Planner identity
origin_ref: originN   # Source of strategic directive
key_ref: keyN         # Unlock or binding trigger
agent_ref: agentN     # Planner or executor class
badge_ref: badgeN     # Operational status, tier, or constraint
```

---

## 🔎 Overview

`planN` is the symbolic coordination capsule that:

* Anchors `jobN`, `phaseN`, `trip`, or full-property campaigns
* Encodes scope, chaining mode, constraint logic, and progression path
* Enables CRM-linked strategy syncing, with memo + agent reference

---

## 🔹 Byte Layout (5+ bytes)

### Byte 1 — `plan_type` + `scope_span`

| Bits | Field        | Description                  |
| ---- | ------------ | ---------------------------- |
| 0–3  | `plan_type`  | Goal category or work intent |
| 4–7  | `scope_span` | Breadth or context coverage  |

#### `plan_type`

| Value | Type                |
| ----- | ------------------- |
| 0000  | Diagnostic Survey   |
| 0001  | Repair Operation    |
| 0010  | Full Replacement    |
| 0011  | System Upgrade      |
| 0100  | Preventive Service  |
| 0101  | Damage Mitigation   |
| 0110  | Retrofit / Rework   |
| 0111  | Multi-Zone Campaign |

#### `scope_span`

| Value | Scope Class           |
| ----- | --------------------- |
| 0000  | Single Fixture        |
| 0001  | Room / Zone           |
| 0010  | Full System           |
| 0011  | Interior Only         |
| 0100  | Exterior Only         |
| 0101  | Whole Property        |
| 0110  | Shared Infrastructure |
| 0111  | Unknown / TBD         |

---

### Byte 2 — `job_chain_start` + `phase_link_mode`

| Bits | Field             | Description                |
| ---- | ----------------- | -------------------------- |
| 0–3  | `job_chain_start` | Starting jobN ID           |
| 4–7  | `phase_link_mode` | Phase progression strategy |

#### `phase_link_mode`

| Value | Mode                     |
| ----- | ------------------------ |
| 0000  | Linear                   |
| 0001  | Parallel                 |
| 0010  | Conditional              |
| 0011  | Supervisor-Triggered     |
| 0100  | Customer-Gated           |
| 0101  | Resource-Based           |
| 0110  | Rule-Enforced            |
| 0111  | Ad-Hoc (manual override) |

---

### Byte 3 — `constraint_class` + `plan_priority`

| Bits | Field              | Description             |
| ---- | ------------------ | ----------------------- |
| 0–3  | `constraint_class` | Primary constraint type |
| 4–7  | `plan_priority`    | Urgency or value tier   |

#### `constraint_class`

| Value | Constraint Logic       |
| ----- | ---------------------- |
| 0000  | None / Flexible        |
| 0001  | Access Limited         |
| 0010  | Permit-Dependent       |
| 0011  | Time-Window Sensitive  |
| 0100  | Client Availability    |
| 0101  | Material Availability  |
| 0110  | Utility Coordination   |
| 0111  | Inter-agency Alignment |

#### `plan_priority`

| Value | Class             |
| ----- | ----------------- |
| 0000  | Routine           |
| 0001  | Escalated         |
| 0010  | Emergency         |
| 0011  | Contract-Required |
| 0100  | Preventive        |
| 0101  | Follow-Up         |
| 0110  | Backlog Reduction |
| 0111  | Training Scenario |

---

### Byte 4 — `plan_status` + `handoff_mode`

| Bits | Field          | Description                  |
| ---- | -------------- | ---------------------------- |
| 0–3  | `plan_status`  | Current plan state           |
| 4–7  | `handoff_mode` | Ownership / delegation logic |

#### `plan_status`

| Value | State              |
| ----- | ------------------ |
| 0000  | Not Started        |
| 0001  | In Progress        |
| 0010  | Awaiting Materials |
| 0011  | On Hold            |
| 0100  | Completed          |
| 0101  | Cancelled          |
| 0110  | Archived           |
| 0111  | Escalated Review   |

#### `handoff_mode`

| Value | Handoff Style         |
| ----- | --------------------- |
| 0000  | Retained by Agent     |
| 0001  | To Tech               |
| 0010  | To Sales              |
| 0011  | To Supervisor         |
| 0100  | Dispatch Triggered    |
| 0101  | Customer Acknowledged |
| 0110  | CRM Transfer          |
| 0111  | Rule-Driven           |

---

### Byte 5+ (Optional) — `memo_ref` + `plan_tag`

* CRM, external reference, plan ID, trip crosslink
* Stored in `memoN`, linked to `learnN`, `reflectN`

---

## ✅ Status

| Feature                        | State |
| ------------------------------ | ----- |
| Multi-phase plan logic encoded | ✅     |
| Constraint + priority support  | ✅     |
| Phase/job chaining included    | ✅     |
| Identity block embedded        | ✅     |
| External reference ready       | ✅     |