---
title: frameN_v1.1.md
category: interaction capsule
status: stable
---

## Capsule: `frameN`

**Purpose:** Encodes short-term contextual working memory state for real-time AI dialog, quote, or job coordination. Designed to track active capsules, their recency, attention priority, and reflex freshness.

```yaml
uid_ref: traceN          # Optional symbolic ID threading slot lineage
source_profile: profileN # Identity of agent or process that altered slot
origin_ref: originN      # Optional platform or agent state origin
key_ref: keyN            # Optional trust signature
```

---

## 🧠 Overview
`frameN` holds ordered memory slots that reflect what the agent is currently “thinking about.” Unlike `clip`, which is archival, `frameN` is volatile, priority-ranked, and designed for:
- Interrupt recovery
- Active quote or objection referencing
- Reflex chaining
- Intent modeling

Multi-slot buffer. Default 4–8 slots. Each slot = 4 bytes.

---

## 🔣 Byte Layout (Per Slot)

### Byte 1 — Slot Index + Attention Priority

| Bits | Field           | Description                                |
|------|------------------|--------------------------------------------|
| 0–3  | `slot_index`      | Position in working buffer (0–F)           |
| 4–7  | `priority_flag`   | Urgency or salience (0–F)                  |

### Byte 2 — Capsule Reference

| Bits | Field             | Description                            |
|------|-------------------|----------------------------------------|
| 0–3  | `capsule_ref_type`| Symbolic capsule type                  |
| 4–7  | `ref_id`          | Local capsule index or short UID ref   |

| `capsule_ref_type` | Capsule Name       |
|--------------------|---------------------|
| 0000               | `trip`              |
| 0001               | `quoteN`            |
| 0010               | `scrip`             |
| 0011               | `chatN`             |
| 0100               | `jobN`              |
| 0101               | `planN`             |
| 0110               | `phaseN`            |
| 0111               | `ruleN`             |

### Byte 3 — Intent + Recency Score

| Bits | Field           | Description                            |
|------|------------------|----------------------------------------|
| 0–3  | `intent_class`    | Inferred intent from this memory object |
| 4–7  | `recency_score`   | Temporal freshness (0 = fresh, F = stale) |

| `intent_class`   | Intent Mapping           |
|------------------|---------------------------|
| 0000             | Quote Request             |
| 0001             | Scope Inquiry             |
| 0010             | Objection Raised          |
| 0011             | Scheduling Intent         |
| 0100             | Design / Vision Input     |
| 0101             | Technical Clarification   |
| 0110             | Emotional / Conflict Tag  |
| 0111             | Mixed / Ambiguous Intent  |

### Byte 4 — Expiry Flags + Slot Behavior

| Bits | Field           | Description                           |
|------|------------------|---------------------------------------|
| 0–3  | `expiry_flag`     | Slot freshness logic                  |
| 4–7  | `slot_behavior`   | Update policy                        |

| `expiry_flag` | Meaning               |
|---------------|------------------------|
| 0000          | Fresh                  |
| 0001          | Aging                  |
| 0010          | Expired                |
| 0011          | Force Clear            |

| `slot_behavior`     | Description                          |
|---------------------|--------------------------------------|
| 0000                | Manual Clear Only                    |
| 0001                | Auto-Decay                           |
| 0010                | Overwrite if Duplicate               |
| 0011                | Sticky (high-resistance to overwrite) |
| 0100                | Promote to `clip`                    |
| 0101                | Fork to new `jobN`                   |
| 0110                | Merge into Slot 0                    |
| 0111                | Suppress Reply Logic                 |

---

## 🔗 Integration Notes
- `frameN` is scanned during quote, objection, or `chatN` response loops
- Can influence reflex triggers, escalation logic, and memory replay
- Used to suppress redundant replies, stabilize intent, or promote memory into `clip`

---

## ✅ Status
| Feature                                | State |
|----------------------------------------|--------|
| Full slot layout + symbolic mappings    | ✅     |
| Short-term reflex anchoring             | ✅     |
| Capsule + intent + freshness integration| ✅     |
| Identity capsule linking                | ✅     |
