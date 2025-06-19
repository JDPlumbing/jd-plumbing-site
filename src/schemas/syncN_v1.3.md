---
title: syncN_v1.3.md
category: economic capsule
status: stable
---

## Capsule: `syncN`

**Purpose:** Encodes push/pull/mirror operations, external system integration, and reflex triggers. Provides symbolic lineage of sync events across CRM, billing, chat, and platform ecosystems.

```yaml
uid_ref: traceN         # Symbolic sync lineage and audit threading
source_profile: profileN # Identity of actor or system performing sync
origin_ref: originN      # Context or platform origin of sync
key_ref: keyN            # Optional cryptographic identity
```

---

## 🔁 Overview

`syncN` is used to:
- Track when internal data (like quotes, jobs, chats) syncs to CRMs, spreadsheets, external DBs
- Trigger reflex actions like follow-ups, escalations, or updates
- Diagnose sync failures, retries, backfills, or overrides
- Provide symbolic snapshot of state propagation across linked platforms

---

## 🔣 Byte Layout (4 bytes / 32 bits)

### Byte 1 — Sync Type + Target System

| Bits | Field          | Description |
|------|----------------|-------------|
| 0–3  | `sync_type`      | Push (Drippy → External), Pull (External → Drippy), Mirror, Webhook Trigger, Scheduled Sync, Manual Sync, One-Time Export, Sync Blocked/Disabled |
| 4–7  | `target_system`  | Google Calendar, Google Sheets, Zapier/Webhook, CRM Tool, Field Service Software, Local DB, Email/SMS Platform, Unknown/Custom |

### Byte 2 — Capsule Ref + Action Type

| Bits | Field         | Description |
|------|----------------|-------------|
| 0–3  | `capsule_ref`    | quoteN, jobN, planN, phaseN, chatN, reflectN, metaN, Global/System Meta |
| 4–7  | `action_type`    | Create, Update, Cancel, Comment, Reminder, Status Change, Archive, Debug / Diagnostic |

### Byte 3 — Sync Status + Timing

| Bits | Field         | Description |
|------|----------------|-------------|
| 0–3  | `status_flag`    | Success, Failed (retry), Skipped/Blocked, Partial, Cancelled, Manual Override, Test Only, Unknown |
| 4–7  | `timing_class`   | Immediate, Scheduled (Daily), Scheduled (Weekly), Trigger-based, User-Requested, Delayed (Approval), Historical Backfill, Future Placeholder |

### Byte 4 — Reflex + Link Mode

| Bits | Field          | Description |
|------|----------------|-------------|
| 0–3  | `reflex_flag`    | None, Trigger follow-up, Notify supervisor, Create crmN update, Block quoteN advance, Alert reflectN, Escalate jobN, Flag metaN |
| 4–7  | `link_class`     | Manual Only, Linked via linkN, Bi-directional Cascade, Mirror External, CRM-Specific Trigger, Unidirectional Flow, Requires Approver, Disabled/Frozen |

---

## 🔗 Integration Notes

- Used with `quoteN`, `billN`, `chatN`, `reflectN`, `crmN`, `jobN`, and `metaN`
- May spawn or mirror external sync targets
- Supports reflex behavior routing and cascading triggers
- Audit grade: can track sync reliability, backfill, and tamper patterns

---

## ✅ Status

| Feature                              | State |
|--------------------------------------|--------|
| Sync type, capsule, status, timing   | ✅     |
| Reflex and cascading behavior        | ✅     |
| Identity capsule wiring              | ✅     |
| Full symbolic audit compatibility    | ✅     |
