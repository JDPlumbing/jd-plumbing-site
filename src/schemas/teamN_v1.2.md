---
title: teamN_v1.2.md
category: operational capsule
status: stable
--------------

## Capsule: `teamN`

**Purpose:** Represents the state of human actors involved in service delivery. Used for technician roles, dispatch status, shift logic, and crew assignment. Enables load balancing, assignment targeting, and escalation awareness.

```yaml
uid_ref: traceN       # Symbolic team actor lineage tracking
profile_ref: profileN # Author identity
origin_ref: originN   # Role schema origin
key_ref: keyN         # Permission gate or override
agent_ref: agentN     # Class of actor (human/bot)
badge_ref: badgeN     # Tier, license, or shift badge
```

---

## 📊 Byte Layout (4 bytes)

### Byte 1 — `actor_class` + `capability_flag`

| Bits | Field             | Description                       |
| ---- | ----------------- | --------------------------------- |
| 0–3  | `actor_class`     | Role or position type             |
| 4–7  | `capability_flag` | Encoded permission or skills tier |

#### `actor_class`

| Value | Role Type           |
| ----- | ------------------- |
| 0000  | Field Tech          |
| 0001  | Apprentice          |
| 0010  | Dispatcher          |
| 0011  | Sales Rep           |
| 0100  | Supervisor          |
| 0101  | Owner / Lead        |
| 0110  | Subcontractor       |
| 0111  | Virtual Agent / Bot |

#### `capability_flag`

| Value | Skill / Authority Tier  |
| ----- | ----------------------- |
| 0000  | Basic (non-diagnostic)  |
| 0001  | Journeyman              |
| 0010  | Licensed Pro            |
| 0011  | Supervisor Access       |
| 0100  | Sales + Quote           |
| 0101  | Full Admin / Override   |
| 0110  | Limited Access          |
| 0111  | Observing / Shadow Mode |

---

### Byte 2 — `shift_state` + `availability_flag`

| Bits | Field               | Description                  |
| ---- | ------------------- | ---------------------------- |
| 0–3  | `shift_state`       | Time status or active duty   |
| 4–7  | `availability_flag` | Whether they can be assigned |

#### `shift_state`

| Value | Time Coverage      |
| ----- | ------------------ |
| 0000  | On Shift           |
| 0001  | Off Shift          |
| 0010  | On-Call            |
| 0011  | Break / In Transit |
| 0100  | Training / Demo    |
| 0101  | Vacation           |
| 0110  | Sick Leave         |
| 0111  | Unavailable        |

#### `availability_flag`

| Value | Assignment Status  |
| ----- | ------------------ |
| 0000  | Available Now      |
| 0001  | Queued (Next Slot) |
| 0010  | Escalation Only    |
| 0011  | Assigned Elsewhere |
| 0100  | Pending Check-In   |
| 0101  | Frozen / Conflict  |
| 0110  | Overloaded         |
| 0111  | Unknown            |

---

### Byte 3 — `task_count` + `role_preference`

| Bits | Field             | Description                          |
| ---- | ----------------- | ------------------------------------ |
| 0–3  | `task_count`      | How many jobs are currently assigned |
| 4–7  | `role_preference` | What kinds of jobs they prefer       |

#### `task_count`

| Value | Assigned Tasks |
| ----- | -------------- |
| 0000  | 0              |
| 0001  | 1              |
| 0010  | 2              |
| 0011  | 3              |
| 0100  | 4              |
| 0101  | 5              |
| 0110  | 6+             |
| 0111  | Unknown        |

#### `role_preference`

| Value | Preferred Task Type |
| ----- | ------------------- |
| 0000  | Diagnostics         |
| 0001  | Installation        |
| 0010  | Sewer / Excavation  |
| 0011  | Finish / Trim Work  |
| 0100  | Sales or Upsells    |
| 0101  | Anything Assigned   |
| 0110  | Light Duty Only     |
| 0111  | Unknown             |

---

### Byte 4 — `dispatch_zone` + `link_ref`

| Bits | Field           | Description                            |
| ---- | --------------- | -------------------------------------- |
| 0–3  | `dispatch_zone` | Where the actor is physically assigned |
| 4–7  | `link_ref`      | Cross-capsule connection or crew ID    |

#### `dispatch_zone`

| Value | Region / Coverage Zone |
| ----- | ---------------------- |
| 0000  | Zone A / North         |
| 0001  | Zone B / Central       |
| 0010  | Zone C / South         |
| 0011  | Zone D / West          |
| 0100  | Flexible / Float       |
| 0101  | Remote / Virtual       |
| 0110  | Out of Area            |
| 0111  | Unknown                |

#### `link_ref`

| Value | Affiliation / Crew ID |
| ----- | --------------------- |
| 0000  | Crew 1                |
| 0001  | Crew 2                |
| 0010  | Paired With JD        |
| 0011  | Unpaired / Solo       |
| 0100  | Intern / Shadow Role  |
| 0101  | Supervisor Group      |
| 0110  | Contracted Team       |
| 0111  | Unknown               |

---

## ✅ Status

| Feature                             | State |
| ----------------------------------- | ----- |
| Technician role and skill tier map  | ✅     |
| Shift status + dispatch logic       | ✅     |
| Load balancing + assignment prefs   | ✅     |
| Region routing + crew relationships | ✅     |
| Identity capsule block embedded     | ✅     |
