---
title: learnN_v1.1.md
category: logic capsule
status: stable
---

## Capsule: `learnN`

**Purpose:** Tracks adaptive insight, skill accumulation, symbolic learning events, and pattern acquisition. Allows both agents and human technicians to grow, adapt, and self-optimize over time.

```yaml
uid_ref: traceN          # Tracks symbolic learning thread or update lineage
source_profile: profileN # Identity of who learned, confirmed, or authored the learning
origin_ref: originN      # Where the insight emerged from (channel or platform)
key_ref: keyN            # Optional override or cryptographic attestation
```

---

## 🧠 Overview
`learnN` records symbolic growth signals derived from job experience, reflection, or agent context drift.

Use cases:
- Autonomous schema tuning
- Sales/tech process improvements
- Quote logic correction
- Skill drift or role-based experience capture

Default capsule size: 4 bytes (expandable to 6 bytes with `metaN`-linked commentary).

---

## 🔣 Byte Layout (4 bytes standard)

### Byte 1 — `learning_trigger` + `event_class`

| Bits | Field              | Description                              |
|------|---------------------|------------------------------------------|
| 0–3  | `learning_trigger`   | What caused the insight                  |
| 4–7  | `event_class`        | Type of insight                          |

#### `learning_trigger`
- 0000: ReflectN Insight  
- 0001: Fault Resolved  
- 0010: PhaseN Success  
- 0011: Snip Signal Pattern  
- 0100: Manual Upload / Note  
- 0101: Client Feedback  
- 0110: Quote Delta Observed  
- 0111: Unknown

#### `event_class`
- 0000: Workflow Optimization  
- 0001: Material / Tool Learning  
- 0010: Time Saving Technique  
- 0011: Objection Handling  
- 0100: Safety or Error Avoidance  
- 0101: Pattern Recognition  
- 0110: Billing or Scope Friction  
- 0111: Unknown

---

### Byte 2 — `actor_ref` + `schema_target`

| Bits | Field              | Description                              |
|------|---------------------|------------------------------------------|
| 0–3  | `actor_ref`          | Who performed / recorded the learning    |
| 4–7  | `schema_target`      | Which capsule was improved / updated     |

#### `actor_ref`
- 0000: Agent / Bot  
- 0001: JD  
- 0010: Supervisor  
- 0011: Field Tech  
- 0100: Sales Rep  
- 0101: Dispatcher  
- 0110: System (autonomous)  
- 0111: Unknown

#### `schema_target`
- 0000: scripN  
- 0001: quoteN  
- 0010: reflectN  
- 0011: faultN  
- 0100: tripN  
- 0101: teamN  
- 0110: costN  
- 0111: Unknown

---

### Byte 3 — `impact_scope` + `durability_score`

| Bits | Field               | Description                             |
|------|----------------------|-----------------------------------------|
| 0–3  | `impact_scope`        | Where it applies / how broadly          |
| 4–7  | `durability_score`    | How persistent this insight is          |

#### `impact_scope`
- 0000: One Job Only  
- 0001: Capsule-Wide  
- 0010: Org-Wide Pattern  
- 0011: Multi-Job Local Pattern  
- 0100: Phase or Subtask-Specific  
- 0101: Repeat Customer Handling  
- 0110: Documentation Only  
- 0111: Unknown

#### `durability_score`
- 0000: Temporary / One-time  
- 0001: Probable Recall  
- 0010: Long-Term Pattern  
- 0011: Now Baseline Behavior  
- 0100: Archived But Referenced  
- 0101: Lost / Forgotten  
- 0110: Overridden  
- 0111: Unknown

---

### Byte 4 — `reinforcement_flag` + `next_action_class`

| Bits | Field                 | Description                          |
|------|------------------------|--------------------------------------|
| 0–3  | `reinforcement_flag`   | Confirmed or contradicting feedback  |
| 4–7  | `next_action_class`    | What behavior the agent should take  |

#### `reinforcement_flag`
- 0000: Confirmed Success  
- 0001: Partial Success  
- 0010: No Observable Benefit  
- 0011: Negative Feedback  
- 0100: Not Yet Measured  
- 0101: External Validation  
- 0110: Conflicting Data  
- 0111: Unknown

#### `next_action_class`
- 0000: Adjust Schema  
- 0001: Notify Supervisor  
- 0010: Suggest to Agent Prompt  
- 0011: Escalate to MetaN  
- 0100: Archive as Lesson  
- 0101: Replicate in Other Jobs  
- 0110: Request Human Review  
- 0111: None

---

## ✅ Status
| Feature                                 | State |
|-----------------------------------------|--------|
| Learning triggers from job experience   | ✅     |
| Agent + tech knowledge separation       | ✅     |
| Schema update routing + impact control | ✅     |
| Durability and retention logic          | ✅     |
| Reflex feedback + next action mapping   | ✅     |
| Identity capsule references embedded    | ✅     |
