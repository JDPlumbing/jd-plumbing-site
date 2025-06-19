---
title: salesN_v1.3.md
category: economic capsule
status: stable
---

## Capsule: `salesN`

**Purpose:** Encodes human-centered sales interaction logic for LLM field agents. Supports rapport modeling, emotional resonance, objection handling, and urgency framing. Enables symbolic tracking of sales touchpoints and reflex triggers.

```yaml
uid_ref: traceN          # Tracks symbolic sales lineage across touchpoints
source_profile: profileN # Who is driving or engaging the sale
origin_ref: originN      # How/where the conversation originated
key_ref: keyN            # Optional trust signature for audit or escalation
```

---

## 💼 Overview

`salesN` is designed to encode high-emotion, long-cycle, or relationship-heavy quoting scenarios. It captures:
- Rapport state and emotional signals
- Discovery depth and objections
- Scarcity and urgency tactics
- Follow-up stage and resale opportunities

All fields are 4-bit enums. Capsule size is 4 bytes (32 bits).

---

## 🔣 Byte Layout

### 🤝 Byte 1 — Rapport + Emotion

| Bits | Field            | Description |
|------|------------------|-------------|
| 0–3  | `rapport_status` | Cold, Warmed up, Trusted expert, Friendly dynamic, Long-term repeat, Family/friend, Referral, Suspicious/cold |
| 4–7  | `emotion_marker` | Frustration, Anxiety, Relief, Skepticism, Curiosity, Excitement, Embarrassment, Confidence |

### 🔍 Byte 2 — Discovery + Objection

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `question_coverage` | None asked, Surface-level, Moderate (2+ open), Deep needs probed, Objections revealed, Budget discussed, Vision clarified, Refused to answer |
| 4–7  | `objection_flag`    | None, Price too high, Timing/schedule, Needs spouse input, Doesn't trust outcome, Already getting bids, Wants to DIY, Not convinced yet |

### ⏰ Byte 3 — Scarcity + Urgency

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `scarcity_strategy`| None, Time-limited quote, Limited booking slots, Material availability, Repeat client priority, Price change warning, Multi-unit discount, Bonus add-on expires |
| 4–7  | `urgency_position` | No urgency, “Cost is rising”, “Leak getting worse”, “We’re booking out”, “Avoid further damage”, “Keep warranty valid”, “Free up your time”, “Stop the stress” |

### 📅 Byte 4 — Follow-Up + Resale

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `followup_stage`   | First contact, First quote delivered, Second touchpoint, Post-objection ping, Warm lead recheck, Quote expiration, Offer refresh sent, Final contact made |
| 4–7  | `resale_opportunity` | One-off job, Multi-job opportunity, High referral chance, Investor/landlord, Service plan fit, Needs education, Already loyal client, Dormant lead |

---

## 🔗 Integration Notes

- Symbolically links to `quoteN`, `chatN`, `quip`, `memoN`, and `reflectN`
- Behaviorally amplified by `quip` posture and `profileN` actor context
- `traceN` and `keyN` allow symbolic and cryptographic lineage tracking

---

## ✅ Status

| Feature                          | State |
|----------------------------------|--------|
| Symbolic sales byte logic        | ✅     |
| Identity and trust support       | ✅     |
| Rapport + urgency + objection    | ✅     |
| Reflex and follow-up tracking    | ✅     |
| CRM and chat compatibility       | ✅     |
