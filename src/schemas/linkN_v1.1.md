---
title: linkN_v1.1.md
category: logic capsule
status: stable
---

## Capsule: `linkN`

**Purpose:** Models symbolic relationships between capsules — defines trigger conditions, logic flow, dependencies, and propagation links within the Drippy++ ecosystem.

```yaml
uid_ref: traceN          # Unique traceable reference
source_profile: profileN # Identity of agent who authored link
origin_ref: originN      # Context or layer where link was created
key_ref: keyN            # Optional validation or override credential
```

---

## 🔗 Overview
`linkN` encodes **conditional**, **directional**, and **semantic** relationships between capsules. It allows for behavioral propagation (if-then, escalation, suppression), mapping dependencies, triggering state updates, and contextualizing outcomes.

Functions as the **inter-capsule connective tissue**, enabling symbolic causality and control logic across jobN, quoteN, scrip, ruleN, trip, and more.

---

## 🔣 Byte Layout (4 bytes / 32 bits standard)

### Byte 1 — `source_type` + `target_type`
| Bits | Field         | Description                          |
|------|----------------|--------------------------------------|
| 0–3  | `source_type`  | Capsule initiating the link          |
| 4–7  | `target_type`  | Capsule being influenced or affected |

#### `source_type` / `target_type` values:
- 0000: `chatN`
- 0001: `quoteN`
- 0010: `scrip`
- 0011: `ruleN`
- 0100: `phaseN`
- 0101: `jobN`
- 0110: `trip`
- 0111: `grip`

---

### Byte 2 — `link_type` + `activation_mode`
| Bits | Field              | Description                          |
|------|---------------------|--------------------------------------|
| 0–3  | `link_type`         | Nature of the symbolic relationship  |
| 4–7  | `activation_mode`   | When the link activates or applies   |

#### `link_type`
- 0000: Dependency
- 0001: Trigger
- 0010: Escalation
- 0011: Annotation / Labeling
- 0100: Override / Suppression
- 0101: Enablement
- 0110: Derivation (computed)
- 0111: Explainability Trace

#### `activation_mode`
- 0000: Always
- 0001: On Rule Pass
- 0010: On Rule Fail
- 0011: On Input Received
- 0100: On Time Delay
- 0101: On Sensor Signal
- 0110: Conditional Expression
- 0111: Manual Override Only

---

### Byte 3 — `source_ref_id` + `target_ref_id`
| Bits | Field             | Description                                 |
|------|-------------------|---------------------------------------------|
| 0–3  | `source_ref_id`    | Local capsule reference ID or index         |
| 4–7  | `target_ref_id`    | Target capsule ID within same context       |

> Note: These are symbolic context pointers, not global UUIDs.

---

### Byte 4 — `direction_flag` + `context_class`
| Bits | Field              | Description                              |
|------|---------------------|------------------------------------------|
| 0–3  | `direction_flag`     | Flow model for the link (uni/bidirectional) |
| 4–7  | `context_class`      | Domain or behavioral scope of the link    |

#### `direction_flag`
- 0000: Uni (source → target)
- 0001: Bi-directional logic
- 0010: Reverse-only flow
- 0011: Lateral / multi-cast

#### `context_class`
- 0000: Quote Flow
- 0001: Rule Enforcement
- 0010: Job Scheduling
- 0011: Field Execution
- 0100: Sales / Objection Mgmt
- 0101: System Diagnostics
- 0110: Chat Response Planning
- 0111: Training / Reflection

---

## 🧠 Example Symbolic Links
| Source       | Target       | Link Type   | Description                                  |
|--------------|--------------|-------------|----------------------------------------------|
| chatN:008    | quoteN:004   | Escalation  | Customer tone downgraded quote confidence    |
| ruleN:003    | scrip:009    | Trigger     | Run script if rule passes                    |
| trip:007     | jobN:010     | Dependency  | Don’t spawn job unless trip zone is flagged  |
| chatN:006    | scrip:011    | Override    | Suppress script based on customer objection  |

---

## ✅ Status
| Feature                               | State |
|---------------------------------------|--------|
| Source-target linkage                 | ✅     |
| Trigger logic supported               | ✅     |
| Escalation + suppression handling     | ✅     |
| Direction and context scoping         | ✅     |
| Fully symbolic, audit-ready behavior  | ✅     |
| Identity capsule references embedded  | ✅     |
