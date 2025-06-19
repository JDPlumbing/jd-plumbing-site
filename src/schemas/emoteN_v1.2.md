---
title: emoteN_v1.2.md
category: interaction capsule
status: stable
---

## Capsule: `emoteN`

**Purpose:** Encodes symbolic emotional posture, confidence, style, and drift signals. Used by agent frontends and behavioral analytics systems to modulate tone, response framing, and reflex decisions.

```yaml
uid_ref: traceN          # Tracks symbolic emotional lineage or state shift
source_profile: profileN # Optional: who applied or recorded this emotional signature
origin_ref: originN      # Optional: which context or event triggered posture shift
key_ref: keyN            # Optional: authenticated override or injection marker
```

---

## 🧠 Overview
`emoteN` captures the stylistic and emotional state of an agent (human or AI) in a structured, byte-sized symbolic format. It allows posture tracking across dialogs, CRM events, or reflective moments.

Used by:
- `chatN`, `quip`, `reflectN`, `memoN`
- Sales systems to modulate tone (`salesN`)
- Analysis layers via `metaN`, `trustN`, `learnN`

Capsule length: 4 bytes (32 bits).

---

## 🔣 Byte Layout (4 bytes / 32 bits)

### Byte 1 — Tone + Confidence

| Bits | Field              | Description |
|------|---------------------|-------------|
| 0–3  | `tone_class`         | Neutral, Warm, Assertive, Humorous, Serious, Sympathetic, Stern, Unreadable |
| 4–7  | `confidence_class`   | Unsure, Cautious, Confident, Overconfident, Dismissive, Guarded, Naive, Unknown |

### Byte 2 — Style Mask (bitfield)

| Bits | Field         | Description |
|------|----------------|-------------|
| 0–7  | `style_mask`    | Bitwise mix: Casual, Formal, Emoji, Technical, Legalistic, Slang, Joking, Dry |

### Byte 3 — Trigger Source Ref

| Bits | Field         | Description |
|------|----------------|-------------|
| 0–7  | `trigger_ref`   | Capsule source: chatN, quoteN, intentN, memoN, reflectN, etc. Symbolic or UID encoded |

### Byte 4 — Drift Offset

| Bits | Field           | Description |
|------|------------------|-------------|
| 0–7  | `drift_offset`     | Signed int8 offset from default or baseline posture (0 = baseline) |

---

## 🔗 Integration Notes
- `emoteN` is used inline with `chatN`, `quip`, and `reflectN`
- Style and drift data can guide message formatting, UI tone, escalation decisions
- Symbolic lineage via `traceN`, attribution via `profileN` and `originN`

---

## ✅ Status
| Feature                                 | State |
|-----------------------------------------|--------|
| Tone + confidence encoding               | ✅     |
| Composable style encoding                | ✅     |
| Drift detection and behavioral tracking  | ✅     |
| Reflex-ready and capsule linked          | ✅     |
