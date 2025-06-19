---
title: intentN_v1.1.md
category: logic capsule
status: stable
---

## Capsule: `intentN`

**Purpose:** Encodes symbolic goals, causal motivations, and origin contexts for agent actions and reasoning loops. Drives forward intent logic and reflexive goal chaining.

```yaml
uid_ref: traceN          # Tracks symbolic goal instance or propagation thread
source_profile: profileN # Identity of the actor or agent instantiating the intent
origin_ref: originN      # Triggering platform, signal, or reasoning context
key_ref: keyN            # Optional signature or authorization capsule
```

---

## 🧠 Overview
`intentN` encodes the *why* behind agent action. This includes justification, origin, scope, and certainty:
- Thread motivation reconstruction
- Action explanation (e.g. "Why quoteN now?")
- CRM or planN interaction purpose
- Reflex triggers or follow-up resolution

Used in `reflectN`, `chatN`, `quoteN`, `jobN`, `planN`, `phaseN`, `ruleN`, and meta-agent cycles.

---

## 🔣 Byte Layout (3–5 bytes standard)

### Byte 1 — Intent Type + Origin Context

| Bits | Field            | Description |
|------|------------------|-------------|
| 0–3  | `intent_type`     | Agent drive or internal goal |
| 4–7  | `origin_context`  | Trigger signal/context |

#### `intent_type`
- 0000: Quote Generation  
- 0001: Fault Diagnosis  
- 0010: Material Lookup  
- 0011: Code/Rule Explanation  
- 0100: Sales Enablement  
- 0101: Job Planning / Sequencing  
- 0110: Proactive Suggestion  
- 0111: Unknown

#### `origin_context`
- 0000: User Prompt  
- 0001: System Schedule / cron  
- 0010: Rule Violation (`ruleN`)  
- 0011: Fault Trigger (`snip` or `faultN`)  
- 0100: Follow-up Required  
- 0101: Reflective Agent Trigger  
- 0110: Proactive CRM Check-in  
- 0111: Unknown

---

### Byte 2 — Goal Scope + Urgency Bin

| Bits | Field         | Description |
|------|----------------|-------------|
| 0–3  | `goal_scope`     | Breadth of impact / context |
| 4–7  | `urgency_bin`    | Priority / execution urgency |

#### `goal_scope`
- 0000: Single Job or Quote  
- 0001: Customer Thread Context  
- 0010: Multi-Phase Plan  
- 0011: System-Wide Behavior  
- 0100: Agent Training/Internal  
- 0101: Time-Bound Campaign  
- 0110: Dispatch & Routing  
- 0111: Unknown

#### `urgency_bin`
- 0000: Passive / Background  
- 0001: Low  
- 0010: Medium  
- 0011: High  
- 0100: Time-Critical  
- 0101: Escalated  
- 0110: Suppressed / Deferred  
- 0111: Unknown

---

### Byte 3 — Confidence Bin + Capsule Reference

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `confidence_bin`     | Agent certainty / self-belief |
| 4–7  | `related_capsule`    | Symbolic reference to affected domain |

#### `confidence_bin`
- 0000: Very Low  
- 0001: Low  
- 0010: Medium  
- 0011: High  
- 0100: Very High  
- 0101: Human Review Suggested  
- 0110: Self-Check Failed  
- 0111: Unknown

#### `related_capsule`
- 0000: `quoteN`  
- 0001: `jobN`  
- 0010: `faultN`  
- 0011: `chatN`  
- 0100: `reflectN`  
- 0101: `planN`  
- 0110: `ruleN`  
- 0111: None

---

## ✅ Status
| Feature                                   | State |
|-------------------------------------------|--------|
| Action classification & intent typing     | ✅     |
| Trigger mapping (reactive/proactive)      | ✅     |
| Scope, urgency, confidence tagging        | ✅     |
| Capsule link for justification            | ✅     |
| Identity capsule references embedded      | ✅     |
| Reflex loops, meta-reasoning, self-checks | ✅     |
