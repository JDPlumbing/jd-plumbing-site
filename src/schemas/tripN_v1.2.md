---
title: tripN_v1.2.md
category: operational capsule
status: stable
--------------

## Capsule: `trip`

**Purpose:** Defines the environmental or spatial context in which all `drip`, `grip`, `scrip`, and `quip` operations occur. Enables real-world feasibility evaluation and contextual reflexes.

```yaml
uid_ref: traceN       # Symbolic UID for context linking or recall
profile_ref: profileN # Author identity or LLM trace
origin_ref: originN   # Site model source (manual, lidar, CRM)
key_ref: keyN         # Access or lock code for secure context
agent_ref: agentN     # Who captured the trip context
badge_ref: badgeN     # Field cert, survey grade, etc.
```

---

## 📊 Byte Layout (4 bytes)

| Byte | Fields              | Bits | Description                       |
| ---- | ------------------- | ---- | --------------------------------- |
| 1    | `zone_class`        | 4    | Bathroom, Kitchen, Attic, etc.    |
|      | `size_bin`          | 4    | Confined, Compact, Open, etc.     |
| 2    | `attachment_type`   | 4    | Wall, Stud, Slab, etc.            |
|      | `envelope_class`    | 4    | One-side open, Panel hidden, etc. |
| 3    | `elevation_class`   | 4    | Floor level, Ceiling, Roof, etc.  |
|      | `slope_flag`        | 4    | Level, Sloped, Vertical, etc.     |
| 4    | `obstruction_class` | 4    | None, Framing, Ladder-only, etc.  |
|      | `access_mode`       | 4    | Walk-up, Crawl, Reach-only, etc.  |

---

### Byte 1 — `zone_class` + `size_bin`

#### `zone_class`

| Value | Label        |
| ----- | ------------ |
| 0000  | Bathroom     |
| 0001  | Kitchen      |
| 0010  | Mechanical   |
| 0011  | Crawlspace   |
| 0100  | Attic        |
| 0101  | Basement     |
| 0110  | Roof         |
| 0111  | Utility Room |
| 1000  | Exterior     |
| 1001  | Under Slab   |

#### `size_bin`

| Value | Size Class            |
| ----- | --------------------- |
| 0000  | Confined (under sink) |
| 0001  | Compact (closet)      |
| 0010  | Moderate (10–20 ft³)  |
| 0011  | Open layout           |
| 0100  | Large / multi-room    |
| 0101  | Wide-open (garage)    |
| 0110  | Vertical shaft        |
| 0111  | Not enclosed          |

---

### Byte 2 — `attachment_type` + `envelope_class`

#### `attachment_type`

| Value | Label       |
| ----- | ----------- |
| 0000  | Wall        |
| 0001  | Stud cavity |
| 0010  | Slab        |
| 0011  | Sleeve      |
| 0100  | Hanger      |
| 0101  | Strap       |
| 0110  | Float       |
| 0111  | Buried      |

#### `envelope_class`

| Value | Label           |
| ----- | --------------- |
| 0000  | Tight void      |
| 0001  | One side open   |
| 0010  | Partial box     |
| 0011  | Full access     |
| 0100  | Panel hidden    |
| 0101  | Bulkhead access |
| 0110  | Joist bay       |
| 0111  | No envelope     |

---

### Byte 3 — `elevation_class` + `slope_flag`

#### `elevation_class`

| Value | Label            |
| ----- | ---------------- |
| 0000  | Below grade      |
| 0001  | Floor level      |
| 0010  | Knee height      |
| 0011  | Waist height     |
| 0100  | Eye level        |
| 0101  | Ceiling-mounted  |
| 0110  | Roof deck        |
| 0111  | Multi-level span |

#### `slope_flag`

| Value | Slope Description |
| ----- | ----------------- |
| 0000  | Level             |
| 0001  | Sloped (drain)    |
| 0010  | Pitched roof      |
| 0011  | Irregular         |
| 0100  | Vertical wall     |
| 0101  | Ceiling drop      |

---

### Byte 4 — `obstruction_class` + `access_mode`

#### `obstruction_class`

| Value | Obstruction          |
| ----- | -------------------- |
| 0000  | None                 |
| 0001  | Framing conflict     |
| 0010  | Mechanical clash     |
| 0011  | Surface removal req. |
| 0100  | Access hatch         |
| 0101  | Crawl-only access    |
| 0110  | Ladder required      |
| 0111  | Above ceiling tile   |

#### `access_mode`

| Value | Access Method       |
| ----- | ------------------- |
| 0000  | Walk-up             |
| 0001  | Crawl-in            |
| 0010  | Reach-only          |
| 0011  | Ladder use          |
| 0100  | Lift / Scaffold     |
| 0101  | Rope / Boom access  |
| 0110  | Remote visual (cam) |
| 0111  | Demo required       |

---

## ✅ Status

| Feature                     | State |
| --------------------------- | ----- |
| Full enum restoration       | ✅     |
| Identity block integrated   | ✅     |
| No truncation / no etc.     | ✅     |
| Agent-ready spatial context | ✅     |
| Byte layout preserved       | ✅     |
