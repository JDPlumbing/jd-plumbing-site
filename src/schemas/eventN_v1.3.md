---
title: eventN_v1.3.md
category: logic capsule
status: stable
---

## Capsule: `eventN`

**Purpose:** Tracks all symbolic state changes, reflex triggers, and outcome logs across Drippy++ capsules. Acts as the primary audit ledger for agent and actor interactions, with full support for identity capsule linkage.

```yaml
source_trace_uid: traceN        # UID of the initiating capsule instance
result_trace_uid: traceN        # UID of the affected or resulting capsule
source_profile: profileN        # Identity of the actor (human or agent)
source_origin: originN          # Channel, trust level, method of input
source_agent: agentN            # If triggered by an agent or runtime system
source_key: keyN                # Optional verification signature
source_badge: badgeN            # Credential context, if relevant
```

---

### 🧬 Byte Structure (6 bytes)

| Byte | Field Name          | Bits | Description |
|------|---------------------|------|-------------|
| 1    | `event_type`        | 4    | 0 = Reflex, 1 = Quote, 2 = Chat, 3 = Trip, 4 = Task, 5 = Escalation, 6 = Outcome |
|      | `priority_class`    | 4    | 0 = Low, 1 = Normal, 2 = High, 3 = Critical |
| 2    | `capsule_target`    | 6    | Encoded capsule type affected. Examples include: jobN, quoteN, trip, chatN, memoN, reflectN, phaseN |
|      | `actor_role`        | 2    | 0 = Agent, 1 = Technician, 2 = Sales, 3 = System |
| 3    | `result_status`     | 4    | 0 = None, 1 = Success, 2 = Fail, 3 = Retry, 4 = Escalated |
|      | `reflex_action`     | 4    | 0 = No Reflex, 1 = Triggered, 2 = Delayed, 3 = Suppressed, 4 = Resolved |
| 4–5  | `timestamp_delta`   | 16   | Encodes time since prior related event. The unit (seconds, minutes, ticks) is context-dependent and standardized per capsule stream |
| 6    | `confidence_score`  | 4    | 0–15 scale indicating belief strength or trust in the logged state transition |
|      | `trace_flag`        | 4    | Bitmask: supports traceN linkage, override tagging, escalation flags, or behavioral memo reference |

---

### 🔁 Typical Usage
- Tracks when a `quoteN` is created, modified, accepted, or rescinded
- Logs `chatN` interactions that result in job changes, booking confirmations, or sales movements
- Captures job-level failures, warnings, or escalations initiated by humans, agents, or reflex triggers
- Binds the state change to the exact identity of the actor, including profile, origin, credential, and runtime agent ID

---

### 🔗 Related Capsules
- `jobN`, `quoteN`, `phaseN`, `trip`, `chatN`: Targets of symbolic transition
- `traceN`: UID lineage tracking for both source and result
- `agentN`, `profileN`, `originN`, `badgeN`, `keyN`: Identity and trust model resolution
- `reflectN`, `memoN`, `metaN`: Behavioral and operational introspection overlays

---

## ✅ Status

| Feature                                 | State |
|-----------------------------------------|--------|
| Identity capsules wired in              | ✅     |
| Reflex logic and symbolic linkage       | ✅     |
| Audit, escalation, and retry logic      | ✅     |
| Traceable across capsule types          | ✅     |
| Byte structure finalized                | ✅     |
