---
title: traceN_v1.1.md
category: identity capsule
status: stable
description: Unique symbolic ID and lineage tracking for all capsule instances.
---

## Capsule: `traceN`

**Purpose:** Encodes a persistent, symbolic UID and lineage reference for capsule instances. Enables symbolic linking, auditing, replays, and learning across time.

---

### 🧬 Byte Structure (4 bytes / 32 bits)

| Byte | Field Name          | Bits | Description |
|------|---------------------|------|-------------|
| 1    | `capsule_type`      | 6    | Encodes capsule class (e.g., jobN, quoteN, clip, trip) |
|      | `instance_domain`   | 2    | 0 = global / universal UID<br>1 = job-scoped<br>2 = actor/quip scoped<br>3 = ephemeral/temp |
| 2    | `symbol_hash`       | 8    | Local or system-wide symbolic identifier (e.g. 0x3f for a specific job) |
| 3    | `lineage_class`     | 4    | 0 = New<br>1 = Forked<br>2 = Versioned<br>3 = Restored<br>4 = Merged<br>5 = Ghost / Phantom |
|      | `origin_method`     | 4    | 0 = Manual<br>1 = Agent-generated<br>2 = API-ingested<br>3 = Imported<br>4 = Snapshot<br>5 = Sync'd Mirror |
| 4    | `trace_link_type`   | 4    | 0 = Parent<br>1 = Sibling<br>2 = Derived<br>3 = Clone<br>4 = Continuation |
|      | `linked_uid_index`  | 4    | Index reference to previous traceN instance (in registry or log) |

---

### 📌 Capsule Examples

#### New Job Entry:
```yaml
traceN:
  capsule_type: jobN
  instance_domain: 1  # job-scoped
  symbol_hash: 0xA7
  lineage_class: 0  # new
  origin_method: 1  # agent
  trace_link_type: 0  # no prior
  linked_uid_index: 0x0
```

#### Quote Derived From Previous:
```yaml
traceN:
  capsule_type: quoteN
  instance_domain: 1
  symbol_hash: 0xB4
  lineage_class: 2  # versioned
  origin_method: 0  # manual
  trace_link_type: 2  # derived
  linked_uid_index: 0xA7
```

---

### 🔁 Reflex Use Cases
- Allows `eventN` to reference both source and target capsules symbolically
- Used in `metaN`, `reflectN`, or `learnN` to correlate capsule performance
- Can seed cross-agent transfer, memory merge, or syncing systems via `linked_uid_index`

---

### 🛠 Integration Notes
- `traceN` can be a standalone capsule OR embedded as a field (`uid_ref`) within:
  - `jobN`, `phaseN`, `clip`, `quoteN`, `trip`, `eventN`
- Indexing system is up to implementation: could be a UUID, hash, or fixed registry
