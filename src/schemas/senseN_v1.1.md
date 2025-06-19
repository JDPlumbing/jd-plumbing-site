---
title: senseN_v1.1.md
category: logic capsule
status: stable
--------------

## Capsule: `sense`

**Purpose:** Encodes detection logic and observed signal information. Enables symbolic representation of inputs from human, sensor, or AI-based detection across flow, gas, heat, electrical, and other utility anomalies.

```yaml
uid_ref: traceN       # Symbolic detection ID or lineage
profile_ref: profileN # Who or what observed the signal
origin_ref: originN   # Source device, method, or procedure
key_ref: keyN         # Escalation or routing logic
agent_ref: agentN     # Agent that reacted or diagnosed
badge_ref: badgeN     # Certification or source verification
```

---

## 🔣 Byte Structure (4 bytes)

### Byte 1 — `signal_class` + `signal_profile`

#### `signal_class` (0–3)

| Bits | Signal Detected   |
| ---- | ----------------- |
| 0000 | Flow anomaly      |
| 0001 | Leak / drip       |
| 0010 | Gas / odor        |
| 0011 | Electrical signal |
| 0100 | Noise / vibration |
| 0101 | Temperature       |
| 0110 | Discoloration     |
| 0111 | Pressure loss     |

#### `signal_profile` (4–7)

| Bits | Shape / Quality     |
| ---- | ------------------- |
| 0000 | Continuous          |
| 0001 | Pulsed              |
| 0010 | Transient           |
| 0011 | Rhythmic            |
| 0100 | Faint               |
| 0101 | Intense             |
| 0110 | Inverse/dropout     |
| 0111 | Spurious / artifact |

---

### Byte 2 — `sensor_mode` + `sensor_source`

#### `sensor_mode` (0–3)

| Bits | Detection Method |
| ---- | ---------------- |
| 0000 | Visual (human)   |
| 0001 | Audio (human)    |
| 0010 | Infrared         |
| 0011 | Acoustic         |
| 0100 | Pressure sensor  |
| 0101 | Leak detector    |
| 0110 | Digital scan     |
| 0111 | AI / LLM-based   |

#### `sensor_source` (4–7)

| Bits | Signal Origin        |
| ---- | -------------------- |
| 0000 | Human direct         |
| 0001 | Remote sensor        |
| 0010 | Mounted hardware     |
| 0011 | Inferred (symptom)   |
| 0100 | Augmented overlay    |
| 0101 | Camera visual feed   |
| 0110 | Historical scan      |
| 0111 | LLM-diagnostic trace |

---

### Byte 3 — `range_class` + `confidence_class`

#### `range_class` (0–3)

| Bits | Detection Radius |
| ---- | ---------------- |
| 0000 | Immediate        |
| 0001 | Arm’s Length     |
| 0010 | Room-wide        |
| 0011 | Line-of-sight    |
| 0100 | Wall-penetrating |
| 0101 | Structural span  |
| 0110 | Building-wide    |
| 0111 | Remote system    |

#### `confidence_class` (4–7)

| Bits | Certainty Level |
| ---- | --------------- |
| 0000 | Unknown         |
| 0001 | Low             |
| 0010 | Moderate        |
| 0011 | High            |
| 0100 | Very High       |
| 0101 | Verified        |
| 0110 | Conflicted      |
| 0111 | Likely False    |

---

### Byte 4 — `trigger_state` + `data_linkage`

#### `trigger_state` (0–3)

| Bits | State of Detection |
| ---- | ------------------ |
| 0000 | Idle               |
| 0001 | Latent             |
| 0010 | Near Threshold     |
| 0011 | Triggered          |
| 0100 | Peaked             |
| 0101 | Resolved           |
| 0110 | Repeating          |
| 0111 | False Positive     |

#### `data_linkage` (4–7)

| Bits | Context Link         |
| ---- | -------------------- |
| 0000 | None                 |
| 0001 | Scrip sequence       |
| 0010 | Drip material        |
| 0011 | Clip history segment |
| 0100 | Trip zone marker     |
| 0101 | Quip actor memory    |
| 0110 | Grip tool reference  |
| 0111 | Log record / trace   |

---

## ✅ Status

| Field                       | State |
| --------------------------- | ----- |
| All 8 nibbles defined       | ✅     |
| Capsule ID block integrated | ✅     |
| No truncation present       | ✅     |
| Renamed to `senseN` schema  | ✅     |
| LLM-compatible signal map   | ✅     |
