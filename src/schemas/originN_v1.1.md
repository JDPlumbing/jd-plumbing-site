---
title: originN_v1.1.md
category: identity
status: stable
---

# Capsule: `originN`

## Purpose

The `originN` capsule captures **where a capsule, message, or agent-triggered action came from** — its symbolic provenance. This enables:

* Reflex gating (e.g., "only act if human-sourced")
* Filtering or escalation logic
* Input categorization by channel and trust
* CRM segmentation or feedback loops

**Size:** 4 bytes

---

## Byte Layout

| Byte | Field(s)                                           | Description                                |
| ---- | -------------------------------------------------- | ------------------------------------------ |
| 1    | `origin_class` (4 bits) + `channel_class` (4 bits) | Nature of origin + channel/source category |
| 2    | `actor_type` (4 bits) + `trust_level` (4 bits)     | Identity and subjective trust class        |
| 3    | `input_format` (4 bits) + `assist_flag` (4 bits)   | Input method + AI/manual origin tag        |
| 4    | `epoch_hint`                                       | Time window or recurrence pattern          |

---

## Byte 1 — `origin_class` + `channel_class`

### `origin_class` (0–3 bits)

* `0x0` = Human (typed, spoken)
* `0x1` = Agent/AI-generated
* `0x2` = Imported system data
* `0x3` = Uploaded file/input
* `0x4` = Sensor-based
* `0x5` = External API
* `0x6` = Inferred/hallucinated
* `0x7–F` = Reserved

### `channel_class` (4–7 bits)

* `0x0` = Mobile App
* `0x1` = Web Portal
* `0x2` = Dispatcher Interface
* `0x3` = On-site Device
* `0x4` = CRM or System Sync
* `0x5` = Voice
* `0x6` = SMS/Text
* `0x7` = Email or Print

---

## Byte 2 — `actor_type` + `trust_level`

### `actor_type` (0–3 bits)

* `0x0` = Client
* `0x1` = Technician
* `0x2` = Dispatcher
* `0x3` = Bot/Agent
* `0x4` = Supervisor
* `0x5` = External (Yelp, sync, etc.)

### `trust_level` (4–7 bits)

* `0x0` = Unknown
* `0x1` = Unverified
* `0x2` = Verified
* `0x3` = High Trust
* `0x4` = Internal System

---

## Byte 3 — `input_format` + `assist_flag`

### `input_format`

* `0x0` = Typed Freeform
* `0x1` = Voice
* `0x2` = Form or Template
* `0x3` = AI Prompt
* `0x4` = Button/Trigger

### `assist_flag`

* `0x0` = Manual
* `0x1` = System Assisted
* `0x2` = Agent-Coached
* `0x3` = Reflex-Generated

---

## Byte 4 — `epoch_hint`

| Code Range  | Meaning                            |
| ----------- | ---------------------------------- |
| `0x00–0x20` | Fixed quarters (Q1 2020 → Q4 2025) |
| `0x21–0xFD` | Hashed symbolic range              |
| `0xFE`      | Unknown                            |
| `0xFF`      | Repeating/automated                |

---

## Sample Encodings

**Client-typed request via app, verified, manual**
→ `0x00 02 00 1C`

**Agent reflex message from CRM, high trust, button trigger**
→ `0x14 34 43 FF`

---

## References

* May be used in: `eventN`, `chatN`, `memoN`, `quoteN`, `jobN`, `metaN`
* Useful for symbolic: filtering, classification, access gating, memory tracing
* Optional: not all capsules need it, but enhances traceability

---

## Summary

`originN` brings symbolic traceability to every input — clarifying *who*, *from where*, *by what means*, and *with what trust level* a capsule was born.
