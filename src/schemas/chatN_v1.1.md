---
title: chatN_v1.1.md
category: interaction capsule
status: stable
---

## Capsule: `chatN`

**Purpose:** Encodes structured conversational signals for symbolic context, escalation, tone tracking, and reply mapping across dialog systems.

```yaml
uid_ref: traceN         # Optional symbolic ID to thread dialog or trace outcome lineage
source_profile: profileN # Identity capsule of the speaker (agent or client)
origin_ref: originN      # Context or channel in which conversation originated
key_ref: keyN            # Optional identity confirmation / trust
```

---

## 🧠 Overview
`chatN` tracks symbolic dialog context across message streams, CRM systems, and field notes. It enables tone-aware memory, escalation signals, and procedural overlays for:
- LLM or human agents
- CRM entries
- Workflow triggers or alerts
- Analytics and follow-up logic

Capsule is 4 bytes (32 bits) — extendable if necessary.

---

## 🔣 Byte Layout (4 bytes)

### Byte 1 — Message Type + Tone

| Bits | Field       | Description |
|------|-------------|-------------|
| 0–3  | `msg_type`   | Inquiry, Quote Request, Objection, Approval, Delay, Access, Schedule Request, Personal Context |
| 4–7  | `tone_class` | Neutral, Frustrated, Curious, Skeptical, Anxious, Enthusiastic, Distracted, Aggressive |

### Byte 2 — Topic + Escalation

| Bits | Field            | Description |
|------|------------------|-------------|
| 0–3  | `topic_flag`      | Pricing, Access, Timing, Code, Warranty, Materials, Job Scope, Personal |
| 4–7  | `escalation_flag` | None, Needs Human, Trust/Risk Flag, Urgent, CRM Reentry, Legal Alert, Emotional Trigger, Payment Issue |

### Byte 3 — Thread Link + Intent Certainty

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `reply_linkage`     | New, Follow-up, Direct Response, Branch, Redirect, Interrupt, Repeat, Cited Prior |
| 4–7  | `intent_certainty`  | Unknown, Low, Moderate, High, Confirmed, Customer Specified, Ambiguous, Inverted |

### Byte 4 — Channel + Visibility

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `channel_mode`     | In-person, Phone, SMS, Email, Chat UI, CRM Note, Workflow Comment, Voice Bot |
| 4–7  | `visibility_flag`  | Agent-only, Client-facing, Supervisor/Internal, CRM-Logged, Sales Team, Compliance, Script-linked, Public |

---

## 🔗 Integration Notes
- Used with `crmN`, `salesN`, `eventN`, `reflectN`, `metaN`
- Works inline with `quip` posture and `trustN` escalation logic
- Identity capsule fields enable symbolic attribution, reflexes, and replay

---

## ✅ Status
| Feature                         | State |
|----------------------------------|--------|
| Tone + escalation tracking       | ✅     |
| Symbolic linkage (reply, topic)  | ✅     |
| Full integration fields present  | ✅     |
| No truncation or loss of detail  | ✅     |
