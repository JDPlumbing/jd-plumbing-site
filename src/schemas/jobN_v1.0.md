---
title: jobN_v1.0.md
category: operational capsule
status: stable
--------------

## Capsule: `jobN`

**Purpose:** Defines a persistent task anchor for managing quote state, actor assignment, capsule references, and real-time progression flags.

```yaml
uid_ref: traceN       # Symbolic job identity
profile_ref: profileN # Task profile, customer-facing
origin_ref: originN   # Source of job (trip, quote, api)
key_ref: keyN         # Access key for agents
agent_ref: agentN     # Assigned technician or AI
badge_ref: badgeN     # Credential flags
```

---

## 🔹 Byte Layout (4–6 bytes)

### Byte 1 — `job_phase` + `job_type`

| Bits | Field       | Description                                |
| ---- | ----------- | ------------------------------------------ |
| 0–3  | `job_phase` | Inquiry, Estimate, Booked, Execution, etc. |
| 4–7  | `job_type`  | Diagnostic, Install, Upgrade, etc.         |

#### `job_phase`

| Value | Phase       |
| ----- | ----------- |
| 0000  | Inquiry     |
| 0001  | Estimated   |
| 0010  | Booked      |
| 0011  | In Progress |
| 0100  | Paused      |
| 0101  | Completed   |
| 0110  | Abandoned   |
| 0111  | Archived    |

#### `job_type`

| Value | Job Type          |
| ----- | ----------------- |
| 0000  | Diagnostic        |
| 0001  | Spot Repair       |
| 0010  | Full Replacement  |
| 0011  | Upgrade / Remodel |
| 0100  | Maintenance       |
| 0101  | Emergency         |
| 0110  | Multi-phase       |
| 0111  | Meta / Training   |

---

### Byte 2 — `assigned_actor` + `quote_status`

| Bits | Field            | Description             |
| ---- | ---------------- | ----------------------- |
| 0–3  | `assigned_actor` | Actor role managing job |
| 4–7  | `quote_status`   | Current quote state     |

#### `assigned_actor`

| Value | Role       |
| ----- | ---------- |
| 0000  | Unassigned |
| 0001  | LLM Agent  |
| 0010  | Field Tech |
| 0011  | Sales Rep  |
| 0100  | Dispatcher |
| 0101  | Supervisor |
| 0110  | Apprentice |
| 0111  | Customer   |

#### `quote_status`

| Value | Status           |
| ----- | ---------------- |
| 0000  | No Quote         |
| 0001  | Quote Proposed   |
| 0010  | Under Review     |
| 0011  | Approved         |
| 0100  | Declined         |
| 0101  | Needs Revision   |
| 0110  | Converted to Job |
| 0111  | Legacy Quote     |

---

### Byte 3 — `capsule_ref_type` + `capsule_ref_id`

| Bits | Field              | Description                              |
| ---- | ------------------ | ---------------------------------------- |
| 0–3  | `capsule_ref_type` | What capsule is linked                   |
| 4–7  | `capsule_ref_id`   | Index into capsule stack or local job DB |

#### `capsule_ref_type`

| Value | Capsule Type |
| ----- | ------------ |
| 0000  | quoteN       |
| 0001  | scrip        |
| 0010  | drip         |
| 0011  | trip         |
| 0100  | clip         |
| 0101  | salesN       |
| 0110  | phaseN       |
| 0111  | quip         |

---

### Byte 4 — `state_flags` (8 bits)

| Bit | Flag Name             | Meaning                                 |
| --- | --------------------- | --------------------------------------- |
| 0   | `waiting_on_input`    | Awaiting customer or actor input        |
| 1   | `quote_ready`         | A quote is attached and explorable      |
| 2   | `task_in_progress`    | At least one scrip is running           |
| 3   | `next_step_ready`     | Agent has proposed a next step          |
| 4   | `blocked_by_rule`     | ruleN conflict is halting progress      |
| 5   | `needs_supervision`   | Actor cannot complete without oversight |
| 6   | `repeat_contact_flag` | Sales loop triggered follow-up logic    |
| 7   | `handoff_ready`       | Job can be transferred or closed        |
| 8   | `field_inspected`     | Human has confirmed site conditions     |

---

### Byte 5 (Optional) — `last_update_epoch`

| Value | Time Bin      |
| ----- | ------------- |
| 0000  | Unknown       |
| 0001  | Today         |
| 0010  | This Week     |
| 0011  | This Month    |
| 0100  | Last 90 Days  |
| 0101  | 6+ Months Ago |
| 0110  | Over 1 Year   |
| 0111  | Future-dated  |

---

## ✅ Status

| Feature                         | State |
| ------------------------------- | ----- |
| Byte structure defined          | ✅     |
| Actor + quote tracking enabled  | ✅     |
| Phase + flag logic compatible   | ✅     |
| Integration with `phaseN` ready | ✅     |
| Expandable for analytics        | ✅     |