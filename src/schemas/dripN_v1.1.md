
---
title: dripN_v1.1.md
category: physical capsule
status: stable
--------------

## Capsule: `drip`

**Purpose:** Defines a unified, compressed encoding for physical materials and plumbing components in the drippy_ai system. Spans **Zoom Levels 1 through 6**, building upon a **universal Zoom 0 material layer**. Each `.drip` object occupies **4 to 8 bytes**, maintaining full simulation fidelity and cross-compatibility with legacy `.dripN` schemas.

```yaml
uid_ref: traceN       # Symbolic UID for material lineage or instance
profile_ref: profileN # Author or device trace
origin_ref: originN   # Source model or scan logic
key_ref: keyN         # Access or tamper conditions
agent_ref: agentN     # Recorder or responsible actor
badge_ref: badgeN     # Inspection cert, product ID, or override
```

> Note: `drip0` is now treated as a **universal material genome layer**, shared across all schema families (grip/scrip/etc), and excluded from this encoding.

---

## 📊 Byte Structure (4–8 bytes)

### Byte 1 — Zoom Level + Object Class

| Bits | Field        | Description                          |
| ---- | ------------ | ------------------------------------ |
| 0–3  | `zoom_level` | 1–6 (Zoom Level of object)           |
| 4–7  | `obj_class`  | Domain: linear, fitting, valve, etc. |

### Byte 2 — Subtype + Material Ref

| Bits | Field            | Description                            |
| ---- | ---------------- | -------------------------------------- |
| 0–3  | `subclass`       | Variant logic (elbow, trap, tee, etc.) |
| 4–7  | `drip0_material` | Reference into `.drip0` genome layer   |

### Byte 3 — Dimensional + System Hints

| Bits | Field          | Description                      |
| 0–2  | `size_class`   | Nominal diameter or OD index     |
| 3–5  | `length_class` | Tiered encoding of object length |
| 6–7  | `system_hint`  | DWV, Hot, Cold, Gas, etc.        |

### Byte 4 — Behavior + Install Flags

| Bits | Field             | Description                               |
| ---- | ----------------- | ----------------------------------------- |
| 0    | `field_cuttable`  | 1 = Can be cut in field                   |
| 1    | `directional`     | 1 = Has flow direction (e.g. check valve) |
| 2    | `access_required` | 1 = Must remain accessible post-install   |
| 3    | `is_chiral`       | 1 = Left/right handed                     |
| 4    | `has_state`       | 1 = Can open/close                        |
| 5    | `pressure_class`  | 0–3: low to high pressure rating          |
| 6–7  | `port_count`      | Number of inlet/outlet ports (1–4)        |

---

## ⚡ Byte 5+ (Conditional)

Only present for `.drip3` or higher, or when additional component behavior is needed.

### Byte 5 — Assembly Context (Zoom 3–4)

| Bits | Field           | Description                  |
| ---- | --------------- | ---------------------------- |
| 0–2  | `mount_type`    | Floor, wall, ceiling, etc.   |
| 3–5  | `orientation`   | Horizontal, vertical, angled |
| 6–7  | `is_procedural` | 1 = Generated, not prefab    |

### Byte 6–7 — Optional Port Metadata

> Used for `.drip3` and `.drip4` objects with nontrivial geometry, joint types, or face mappings.

---

## 🔹 Zoom Summary Table

| Zoom | Object Type         | Bytes | Notes                               |
| ---- | ------------------- | ----- | ----------------------------------- |
| 1    | Linear stock        | 4     | Pipe, tube, rod                     |
| 2    | Fittings            | 4     | Elbows, caps, adapters              |
| 3    | Compound assemblies | 5–7   | Traps, fill valves, lav platforms   |
| 4    | Fixtures/appliances | 6–8   | Toilets, water heaters, dishwashers |
| 5    | Layout envelopes    | 6     | Bath/kitchen system layout wrappers |
| 6    | Subsystem container | 6     | Full DWV, potable loop, or gas bank |

---

## ✅ Status

| Feature                                 | State |
| --------------------------------------- | ----- |
| Zoom 1–6 full support                   | ✅     |
| `.drip0` shared material layer          | ✅     |
| No truncation, all logic preserved      | ✅     |
| Identity capsule block embedded         | ✅     |
| Ready for simulation + reflex pipelines | ✅     |
