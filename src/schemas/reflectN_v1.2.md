---
title: reflectN_v1.2.md
category: logic capsule
status: stable
---

## Capsule: `reflectN`

**Purpose:** Outcome Review + Self-Improvement Capsule for drippy_ai Agent Intelligence

```yaml
uid_ref: traceN          # Review UID thread / memory ref
source_profile: profileN # Actor performing the reflection
origin_ref: originN      # Trigger or review source
key_ref: keyN            # Optional confirmation or override
```

---

## 🧠 Overview
The `reflectN` capsule encodes **review events, lessons learned, and schema improvement suggestions** after jobs, quotes, or interactions complete. It serves as the **observational memory unit**, designed for use in Phase 4 (Reflective Agent).

Used to:
- Identify failure patterns
- Propose schema upgrades
- Trigger future nudges
- Reweight quoting, scripting, or planning strategies
- Capture agent introspection cycles

---

## 🔣 Byte Layout (5 bytes standard, expandable)

### Byte 1 — `event_type` + `severity_class`
| Bits | Field           | Description                            |
|------|------------------|----------------------------------------|
| 0–3  | `event_type`     | Type of event being reflected on       |
| 4–7  | `severity_class` | Impact or cost classification          |

#### `event_type`
- 0000: Success Confirmation  
- 0001: Failure  
- 0010: Customer Drop-Off  
- 0011: Escalation Triggered  
- 0100: Quote Rejected  
- 0101: Rework Required  
- 0110: Delay / Stall  
- 0111: Compliance Conflict

#### `severity_class`
- 0000: Minimal  
- 0001: Time Loss  
- 0010: Profit Loss  
- 0011: Legal/Code Issue  
- 0100: Safety Violation  
- 0101: Reputation Risk  
- 0110: Workflow Breakdown  
- 0111: Mission Failure

---

### Byte 2 — `cause_ref_type` + `cause_ref_id`
| Bits | Field           | Description                            |
|------|------------------|----------------------------------------|
| 0–3  | `cause_ref_type` | Capsule class responsible              |
| 4–7  | `cause_ref_id`   | Local ID/index of causal object        |

#### `cause_ref_type`
- 0000: scripN  
- 0001: ruleN  
- 0010: quoteN  
- 0011: chatN  
- 0100: phaseN  
- 0101: tripN  
- 0110: planN  
- 0111: gripN

---

### Byte 3 — `lesson_class` + `adjustment_flag`
| Bits | Field             | Description                              |
|------|-------------------|------------------------------------------|
| 0–3  | `lesson_class`     | What was learned                         |
| 4–7  | `adjustment_flag`  | What kind of future change is proposed   |

#### `lesson_class`
- 0000: Quote Inaccuracy  
- 0001: Emotional Mismatch  
- 0010: Mis-timed Phase  
- 0011: Access/Logistics Delay  
- 0100: Code/Permit Risk  
- 0101: Rule Blind Spot  
- 0110: Upsell Opportunity Missed  
- 0111: Material Risk Detected

#### `adjustment_flag`
- 0000: None / Log Only  
- 0001: Suggest Schema Tweak  
- 0010: Add New RuleN  
- 0011: Add Chat Prompt Template  
- 0100: Downgrade Quote Certainty  
- 0101: Adjust Scrip Timing  
- 0110: Add to SalesN Objection Bank  
- 0111: Route to Human Review

---

### Byte 4 — `trigger_mode` + `memo_link`
| Bits | Field          | Description                                |
|------|----------------|--------------------------------------------|
| 0–3  | `trigger_mode`  | When/how this reflection was logged        |
| 4–7  | `memo_link`     | Pointer to related `clip`, `meta`, etc.    |

#### `trigger_mode`
- 0000: Manual Post-Job Review  
- 0001: Automatic Rule Failure  
- 0010: ChatN Escalation  
- 0011: PhaseN Halt  
- 0100: Quote Expired  
- 0101: Supervisor Injected  
- 0110: CRM Callback  
- 0111: Periodic Audit

#### `memo_link`
Pointer index or symbolic reference to external `metaN`, `memoN`, or `clip` capsule.

---

### Byte 5 — `agent_flag` + `impact_span`
| Bits | Field          | Description                                |
|------|----------------|--------------------------------------------|
| 0–3  | `agent_flag`    | Internal agent diagnostic / awareness flag |
| 4–7  | `impact_span`   | Where this learning will apply             |

#### `agent_flag`
- 0000: Self-Evaluated  
- 0001: Human-Guided Reflection  
- 0010: LLM-Augmented  
- 0011: Failed Self-Check  
- 0100: Supervisory Prompt  
- 0101: Conflicting Data Streams  
- 0110: CRM Reminder  
- 0111: Unknown

#### `impact_span`
- 0000: Single Job Only  
- 0001: Same Customer Next Visit  
- 0010: Capsule Class System-Wide  
- 0011: PhaseN Adjust Only  
- 0100: Quoting Confidence System  
- 0101: Planning/Dispatch Guidance  
- 0110: Train metaN Insight  
- 0111: None

---

## ✅ Status
| Feature                                 | State |
|-----------------------------------------|--------|
| Outcome trigger types encoded           | ✅     |
| Schema improvement hooks added          | ✅     |
| Causal links and references             | ✅     |
| Lesson memory + propose modes           | ✅     |
| Identity capsule references embedded    | ✅     |
| Agent flag and future projection mapped | ✅     |
