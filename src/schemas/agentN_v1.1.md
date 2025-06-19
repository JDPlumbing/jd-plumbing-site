---
title: agentN_v1.1.md
category: identity capsule
status: stable
---

## Capsule: `agentN`

**Purpose:**  
Encodes the symbolic runtime identity of an autonomous or semi-autonomous actor, such as:

- Chatbots  
- Dispatch AIs  
- Diagnostic tools  
- Embedded field devices  
- CRM/autoresponders  

**Size:** 4 bytes  
**Function:** Tags actions, messages, jobs, quotes, or events with symbolic non-human actor identity.

```yaml
uid_ref: traceN         # Optional symbolic trace linkage
origin_ref: originN     # Context of deployment or invocation
key_ref: keyN           # Credential confirmation if used in secure roles
```

---

## Byte Structure

| Byte | Fields                                         | Description                            |
|------|------------------------------------------------|----------------------------------------|
| 1    | `agent_class` (4 bits) + `host_class` (4 bits) | Type of agent and deployment context   |
| 2    | `capability_flags` (8 bits)                    | Bitfield of symbolic functional powers |
| 3    | `persona_ref` (4 bits) + `scope_ref` (4 bits)  | Behavior mask + authorization scope    |
| 4    | `session_hint` (8 bits)                        | Symbolic runtime ID or trigger stamp   |

---

### Byte 1 — Agent Class + Host Context

#### `agent_class`

| Value | Type               |
|-------|--------------------|
| 0x0   | Virtual Assistant  |
| 0x1   | Diagnostic Bot     |
| 0x2   | Dispatch AI        |
| 0x3   | Scheduling Agent   |
| 0x4   | Quote Estimator    |
| 0x5   | CRM Follow-up Agent |
| 0x6   | Field Tool / Embedded |
| 0x7–0xF | Reserved         |

#### `host_class`

| Value | Host Environment     |
|-------|----------------------|
| 0x0   | Cloud System         |
| 0x1   | Mobile Device        |
| 0x2   | Onboard Tool         |
| 0x3   | Vehicle-mounted      |
| 0x4   | Office Console       |
| 0x5   | Edge Gateway         |
| 0x6   | Proxy/Unknown        |

---

### Byte 2 — Capability Flags

| Bit | Capability         |
|-----|--------------------|
| 0   | Text Communication |
| 1   | Voice Communication|
| 2   | Diagnosis          |
| 3   | Routing/Dispatch   |
| 4   | Quoting            |
| 5   | CRM Follow-up      |
| 6   | Can Trigger Jobs   |
| 7   | Can Escalate Reflex|

---

### Byte 3 — Persona + Scope

#### `persona_ref`

| Value | Persona      |
|-------|--------------|
| 0x0   | Default      |
| 0x1   | Assertive    |
| 0x2   | Playful      |
| 0x3   | Professional |
| 0x4   | Empathetic   |

#### `scope_ref`

| Value | Scope Description         |
|-------|---------------------------|
| 0x0   | Chat only                 |
| 0x1   | Quotes + Comms           |
| 0x2   | Diagnostic + Job Assist  |
| 0x3   | Full Capsule Access      |
| 0x4   | Supervisor Override      |

---

### Byte 4 — Session Hint

| Value Range | Meaning               |
|-------------|------------------------|
| 0x00–0xEF   | Normal runtime/session |
| 0xF0        | System-boot instance   |
| 0xF1        | Escalated reflex thread|
| 0xFE        | Unknown/unrecorded     |
| 0xFF        | Eternal/stateless agent|

---

## Sample Encodings

**Simple chatbot in cloud with quoting ability**  
Hex: `0x00 11 02 C2`  
- agent_class = 0x0  
- host_class = 0x0  
- cap_flags = 0x11  
- persona_ref = 0x0  
- scope_ref = 0x2  
- session_hint = 0xC2

**Mobile diagnostic tool with escalation rights**  
Hex: `0x16 A9 12 5F`

---

## Reference Use

- Capsules: `eventN`, `memoN`, `chatN`, `quoteN`, `reflectN`, `jobN`, `metaN`  
- Pairs with: `personaN`, `originN`, `traceN`, `quip`  
- Enables: runtime tracking, access control, actor logging

---

## ✅ Status

| Feature                        | State |
|--------------------------------|--------|
| Symbolic identity encoding     | ✅     |
| Host and scope modeling        | ✅     |
| Reflex/quote/chat integration  | ✅     |
| Session encoding ready         | ✅     |
