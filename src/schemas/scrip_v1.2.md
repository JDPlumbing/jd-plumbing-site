---
title: scrip_v1.2.md
category: logic capsule
status: stable
--------------

## Capsule: `scrip`

**Purpose:** Encodes symbolic procedures, behavioral programs, and task scripts. Can represent anything from a primitive action to an abstract worldview.

```yaml
uid_ref: traceN       # Symbolic UID for procedure identity and replay
profile_ref: profileN # Who authored the script
origin_ref: originN   # Procedural origin / logic school
key_ref: keyN         # Execution or access conditions
agent_ref: agentN     # Agent class allowed to run
badge_ref: badgeN     # Certification or authority
```

---

## 🔣 Byte Structure (4 bytes)

### Byte 1 — Zoom Level + Agency Role

| Bits | Field         | Description                           |
| ---- | ------------- | ------------------------------------- |
| 0–3  | `zoom_level`  | Procedural scale (`scrip0`–`scrip10`) |
| 4–7  | `agency_role` | Which kind of actor executes it       |

#### `zoom_level`

| Value | Label   | Meaning                        |
| ----- | ------- | ------------------------------ |
| 0000  | scrip0  | Sub-symbolic (not encoded)     |
| 0001  | scrip1  | Primitive action               |
| 0010  | scrip2  | Discrete act                   |
| 0011  | scrip3  | Sequence of acts               |
| 0100  | scrip4  | Codified process               |
| 0101  | scrip5  | Multi-process task             |
| 0110  | scrip6  | Subsystem category             |
| 0111  | scrip7  | Domain ritual logic            |
| 1000  | scrip8  | Multi-agent collaborative      |
| 1001  | scrip9  | Worldview / ideological frame  |
| 1010  | scrip10 | Supra-symbolic (noncomputable) |

#### `agency_role`

| Value | Role                       |
| ----- | -------------------------- |
| 0000  | Generic Executor           |
| 0001  | Physical Actor (embodied)  |
| 0010  | Logic / Code Agent         |
| 0011  | Supervisor / Validator     |
| 0100  | Orchestrator / Dispatcher  |
| 0101  | Passive Participant        |
| 0110  | Observer / Logger          |
| 0111  | Counter-Agent / Interferer |

---

### Byte 2 — Action Class + Flow Mode

| Bits | Field       | Description              |
| ---- | ----------- | ------------------------ |
| 0–3  | `act_class` | Type of motion or output |
| 4–7  | `flow_mode` | Execution flow style     |

#### `act_class`

| Value     | Action Type             |
| --------- | ----------------------- |
| 0000      | Sense / Observe         |
| 0001      | Orient / Move (self)    |
| 0010      | Exert / Apply Force     |
| 0011      | Emit / Express          |
| 0100      | Modulate Internal State |
| 0101      | Initiate Contact        |
| 0110      | Terminate / Withdraw    |
| 0111      | Wait / Delay            |
| 1000–1111 | Reserved                |

#### `flow_mode`

| Value | Pattern               |
| ----- | --------------------- |
| 0000  | Linear (one-shot)     |
| 0001  | Retry on Fail         |
| 0010  | Conditional (IF/THEN) |
| 0011  | Loop (until/while)    |
| 0100  | Parallel / Fork       |
| 0101  | Wait-for-Trigger      |
| 0110  | Optional / Skippable  |
| 0111  | Reversible (has undo) |

---

### Byte 3 — Actee + Tool/Method Reference

| Bits | Field       | Description          |
| ---- | ----------- | -------------------- |
| 0–3  | `actee_ref` | Target of the action |
| 4–7  | `tool_ref`  | Tool or method used  |

#### `actee_ref`

| Value | Target                        |
| ----- | ----------------------------- |
| 0000  | None (actor-only)             |
| 0001  | Generic Material              |
| 0010  | Liquid / Flow                 |
| 0011  | Solid / Object                |
| 0100  | Surface / Interface           |
| 0101  | Symbolic Substrate (doc, msg) |
| 0110  | Environment / Spatial Context |
| 0111  | Other Agent / Body            |

#### `tool_ref`

| Value | Tool / Method                  |
| ----- | ------------------------------ |
| 0000  | None / Barehanded              |
| 0001  | Basic Tool (e.g. tape)         |
| 0010  | Articulated Tool (e.g. pliers) |
| 0011  | Stationary Apparatus           |
| 0100  | Remote / Bot / Proxy           |
| 0101  | Symbolic Method (contract)     |
| 0110  | Cognitive Technique            |
| 0111  | Embedded System Trigger        |

---

### Byte 4 — Outcome Class + Completion Flags

| Bits | Field              | Description        |
| ---- | ------------------ | ------------------ |
| 0–3  | `outcome_class`    | Result encoding    |
| 4–7  | `completion_flags` | Ritual constraints |

#### `outcome_class`

| Value | Outcome Type                |
| ----- | --------------------------- |
| 0000  | None / Silent               |
| 0001  | Binary Pass/Fail            |
| 0010  | Tolerance Window            |
| 0011  | Symbolic Result (msg, mark) |
| 0100  | State Flag (ready, done)    |
| 0101  | Timestamped Event           |
| 0110  | Chain Signal                |
| 0111  | Multi-Agent Confirmation    |

#### `completion_flags`

| Bit | Flag | Meaning            |
| --- | ---- | ------------------ |
| 4   | R    | Reversible         |
| 5   | L    | Logged             |
| 6   | T    | Time-Bound         |
| 7   | A    | Authority Required |

---

## ✳ Example: "Solder Copper Joint"

| Byte | Binary   | Meaning                                 |
| ---- | -------- | --------------------------------------- |
| 1    | 01000001 | scrip4 (codified process), physical     |
| 2    | 00100001 | Exert force, retry on fail              |
| 3    | 00110010 | Target: solid object, Tool: articulated |
| 4    | 00010110 | Binary outcome, logged + time-bound     |
