---
title: trustN_v1.2.md
category: economic capsule
status: stable
---

## Capsule: `trustN`

**Purpose:** Encodes signal confidence and epistemic trust logic for evaluating inputs, claims, and sources. Provides a symbolic layer of modulation for filtering, reflex triggering, suppression, and escalation.

```yaml
uid_ref: traceN           # Trust lineage and audit trail
source_profile: profileN  # Who submitted or judged the signal
origin_ref: originN       # Where the signal originated from
key_ref: keyN             # Optional override or credential signature
```

---

## 🔣 Byte Layout (3 bytes / 24 bits standard, up to 4 bytes optional)

### Byte 1 — Source Class + Signal Type

| Bits | Field          | Description |
|------|----------------|-------------|
| 0–3  | `source_class`   | User Prompt, Sensor (snip), CRM/Sync (crmN), Rule System (ruleN), Reflection (reflectN), API / Web / Feed, Prior Belief, Unknown |
| 4–7  | `signal_type`    | Textual Claim, Numeric Value, Sensor Reading, System Flag, Capsule Bytecode, Judgment, Mood / Emotion, Unknown |

### Byte 2 — Trust Level + Volatility Flag

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `trust_level`        | Untrusted, Low Confidence, Medium, High, Strong Evidence, Human Verified, Legacy/Trusted, Unknown |
| 4–7  | `volatility_flag`    | Static, Occasionally Updated, Frequently Changing, Time-Sensitive, Conflict Detected, Recently Replaced, Known Drift, Unknown |

### Byte 3 — Confidence Override + Flag Tags

| Bits | Field                   | Description |
|------|--------------------------|-------------|
| 0–3  | `confidence_override`     | None, Human Trusted, Human Untrusted, Temp Boosted, Suppressed for Safety, Amplified Priority, API Override, Unknown |
| 4–7  | `flag_tags`               | No Action, Alert Human, Require Redundancy, Block Reflex, Suppress Quote, Log to Reflect, Tag for LearnN, Unknown |

---

## 🔗 Integration Notes

- `trustN` governs reliability and reflex suppression in `reflectN`, `quoteN`, `chatN`, `snip`, and `ruleN`
- `traceN`, `profileN`, `originN`, and `keyN` provide accountability and override pathing
- Used by both agent and human systems for symbolic skepticism and escalation risk scoring

---

## ✅ Status

| Feature                                   | State |
|-------------------------------------------|--------|
| Trust and volatility rating               | ✅     |
| Source/signal classification              | ✅     |
| Confidence override and manual modulation | ✅     |
| Identity capsule linking                  | ✅     |
| Integration with reflect, quote, sensor   | ✅     |
