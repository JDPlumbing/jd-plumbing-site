---
title: crmN_v1.2.md
category: operational capsule
status: stable
--------------

## Capsule: `crmN`

**Purpose:** Represents the customer journey state — from lead to quote to sale or dormancy. Supports follow-up automation, reactivation triggers, and sales analytics.

```yaml
uid_ref: traceN       # Optional UID for contact lineage or CRM instance tracking
profile_ref: profileN # Contact profile anchor
origin_ref: originN   # Channel or intake method
key_ref: keyN         # CRM unlock or access key
agent_ref: agentN     # Assigned CRM agent or bot
badge_ref: badgeN     # Status marks (VIP, blocked, churned, etc)
```

---

## 🧲 Overview

`crmN` represents the **customer journey state** — from lead to quote to sale or dormancy.

It enables:

* Follow-up automation
* Stage-based sales logic
* Contact method preference
* Relationship memory + warm reactivation

It functions as the **symbolic spine** for all long-range nurturing, win-loss tracking, and lead pipeline control.

---

## 🔣 Byte Layout

### Byte 1 — `crm_stage` + `lead_status`

| Bits | Field         | Description             |
| ---- | ------------- | ----------------------- |
| 0–3  | `crm_stage`   | Phase of relationship   |
| 4–7  | `lead_status` | Current viability score |

#### `crm_stage`

| Value | Stage                |
| ----- | -------------------- |
| 0000  | New Lead             |
| 0001  | Contacted            |
| 0010  | Quoted               |
| 0011  | Negotiation          |
| 0100  | Won / Closed         |
| 0101  | Lost                 |
| 0110  | Dormant / No Contact |
| 0111  | Re-Engaged           |

#### `lead_status`

| Value | Score         |
| ----- | ------------- |
| 0000  | Hot Lead      |
| 0001  | Warm Lead     |
| 0010  | Cold Lead     |
| 0011  | Ghosted       |
| 0100  | Unqualified   |
| 0101  | Referred      |
| 0110  | Internal Lead |
| 0111  | Test / Fake   |

---

### Byte 2 — `assigned_actor` + `last_touch_ref`

| Bits | Field            | Description                         |
| ---- | ---------------- | ----------------------------------- |
| 0–3  | `assigned_actor` | Quip or sales rep reference         |
| 4–7  | `last_touch_ref` | Last known `chatN` or `quoteN` ping |

#### `assigned_actor`

| Value | Role / Persona Ref |
| ----- | ------------------ |
| 0000  | Default Rep        |
| 0001  | Owner / JD         |
| 0010  | Supervisor         |
| 0011  | Sales Bot          |
| 0100  | Dispatcher         |
| 0101  | Human Tech         |
| 0110  | Follow-up Bot      |
| 0111  | None Assigned      |

---

### Byte 3 — `next_touch_class` + `preferred_channel`

| Bits | Field               | Description                |
| ---- | ------------------- | -------------------------- |
| 0–3  | `next_touch_class`  | Suggested follow-up action |
| 4–7  | `preferred_channel` | User’s contact preference  |

#### `next_touch_class`

| Value | Follow-up Strategy  |
| ----- | ------------------- |
| 0000  | Immediate Reminder  |
| 0001  | Wait 24h            |
| 0010  | Wait 3 Days         |
| 0011  | Wait 1 Week         |
| 0100  | Re-engage Cold Lead |
| 0101  | Escalate to JD      |
| 0110  | Flag for Inactivity |
| 0111  | Archive Lead        |

#### `preferred_channel`

| Value | Contact Mode  |
| ----- | ------------- |
| 0000  | Text / SMS    |
| 0001  | Email         |
| 0010  | Phone Call    |
| 0011  | In-Person     |
| 0100  | Webform / App |
| 0101  | Internal Only |
| 0110  | No Contact    |
| 0111  | Unknown       |

---

### Byte 4 — `reaction_flag` + `link_sync_status`

| Bits | Field              | Description                          |
| ---- | ------------------ | ------------------------------------ |
| 0–3  | `reaction_flag`    | Trigger behavior on state change     |
| 4–7  | `link_sync_status` | Sync back to `syncN` or external CRM |

#### `reaction_flag`

| Value | Agent Action          |
| ----- | --------------------- |
| 0000  | None                  |
| 0001  | Trigger Follow-up     |
| 0010  | Create Quote          |
| 0011  | Escalate Chat Thread  |
| 0100  | Mark for Meta Logging |
| 0101  | Promote to Hot Lead   |
| 0110  | Suppress Outreach     |
| 0111  | Notify Supervisor     |

#### `link_sync_status`

| Value | External CRM Sync    |
| ----- | -------------------- |
| 0000  | Synced (Live)        |
| 0001  | Pending Sync         |
| 0010  | Failed Last Attempt  |
| 0011  | Manual Push Required |
| 0100  | Blocked by Policy    |
| 0101  | Deprecated Contact   |
| 0110  | Awaiting Webhook     |
| 0111  | Not Linked           |

---

## ✅ Status

| Feature                                  | State |
| ---------------------------------------- | ----- |
| Lead lifecycle + quoting status tracking | ✅     |
| Actor/rep assignment + last interaction  | ✅     |
| Follow-up intent + contact channel prefs | ✅     |
| Sync behavior + CRM bridge               | ✅     |
| Reflex flags for agent triggers          | ✅     |
