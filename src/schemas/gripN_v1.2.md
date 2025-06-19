---
title: gripN_v1.2.md
category: physical capsule
status: stable
---

## Capsule: `grip`

**Purpose:**  
Encodes symbolic models of tools — from manual hand tools to powered rigs — using a unified 4-byte structure. Supersedes segmented `grip1`–`grip6` schemas. Supports scalable mechanical reasoning and reflex-compatible encoding.

```yaml
uid_ref: traceN       # Tool identity or revision lineage
profile_ref: profileN # Creator, cataloger, or witness
origin_ref: originN   # Source input: scan, spec, doc
key_ref: keyN         # Lockout, safety, or IP condition
agent_ref: agentN     # Authorized actor (bot/human)
badge_ref: badgeN     # Certification, compliance, or tier
```

---

## 🧠 Byte Layout (4 bytes)

```
[Byte 1] Scale Tier + Power Source  
[Byte 2] Mechanical Mode + Actuation Class  
[Byte 3] Tool Form + Toolhead Geometry  
[Byte 4] Functional Role + Setup Complexity  
```

---

### Byte 1 — `scale_tier` + `power_source`

#### `scale_tier` (bits 0–3)

| Value | Description          | Examples                       |
|-------|----------------------|--------------------------------|
| 0000  | Micro                | Tweezers, dental picks         |
| 0001  | Handheld             | Pliers, drivers                |
| 0010  | Two-hand / Body      | Pipe cutter, framing nailer    |
| 0011  | Structural / Clamp   | Pipe jigs, vises               |
| 0100  | Stationary Equipment | Drill press, table saw         |
| 0101  | Mobile Rig           | Drain cleaner, service cart    |
| 0110  | Environment-scale    | Hoist, scaffold, lift deck     |
| 0111  | Reserved             |                                |

#### `power_source` (bits 4–7)

| Value | Power Method            |
|-------|--------------------------|
| 0000  | Human / Manual           |
| 0001  | Electric (corded/batt)   |
| 0010  | Pneumatic                |
| 0011  | Hydraulic                |
| 0100  | Combustion (gas/propane) |
| 0101  | Hybrid / Combo           |
| 0110  | Passive (non-actuated)   |
| 0111  | Sensor / Smart           |

---

### Byte 2 — `mechanical_mode` + `actuation_class`

#### `mechanical_mode` (bits 0–3)

| Value | Type               |
|-------|--------------------|
| 0000  | Lever              |
| 0001  | Wedge              |
| 0010  | Inclined Plane     |
| 0011  | Screw              |
| 0100  | Pulley             |
| 0101  | Wheel & Axle       |
| 0110  | Compound Gear/Link |
| 0111  | Dynamic Geometry   |

#### `actuation_class` (bits 4–7)

| Value | Drive / Action Model     |
|-------|---------------------------|
| 0000  | Handle-driven             |
| 0001  | Head-driven               |
| 0010  | Internal Mechanism        |
| 0011  | Distributed / Embedded AI |

---

### Byte 3 — `tool_form` + `toolhead_geometry`

#### `tool_form` (bits 0–3)

| Value | Body / Form Factor     |
|-------|-------------------------|
| 0000  | Inline / Pistol Grip   |
| 0001  | T-Handle                |
| 0010  | Curved / Offset         |
| 0011  | Modular / Swappable     |
| 0100  | No Handle / Surface     |
| 0101  | Clamp / Frame Mounted   |
| 0110  | Two-hand / Full Body    |
| 0111  | Telescoping / Folding   |

#### `toolhead_geometry` (bits 4–7)

| Value | Head or Bit Form        |
|-------|--------------------------|
| 0000  | Flat                     |
| 0001  | Pointed                  |
| 0010  | Rounded / Domed         |
| 0011  | Scoop / Concave          |
| 0100  | Serrated / Toothed       |
| 0101  | Hooked                   |
| 0110  | Compound Geometry        |
| 0111  | Tool-less / Passive Use  |

---

### Byte 4 — `functional_role` + `setup_complexity`

#### `functional_role` (bits 0–3)

| Value | Primary Purpose     |
|-------|----------------------|
| 0000  | Strike / Impact      |
| 0001  | Cut / Shape          |
| 0010  | Grip / Bind / Hold   |
| 0011  | Rotate / Thread      |
| 0100  | Lift / Support       |
| 0101  | Measure / Inspect    |
| 0110  | Feed / Flow / Inject |
| 0111  | Clean / Polish       |

#### `setup_complexity` (bits 4–7)

| Value | Setup Profile           |
|-------|--------------------------|
| 0000  | Plug-and-Use             |
| 0001  | Requires Alignment       |
| 0010  | Operator-Tuned           |
| 0011  | Multi-Mode Selectable    |
| 0100  | Training Required        |
| 0101  | Crew Assist Required     |
| 0110  | Programmed / Sensor Link |
| 0111  | Manual Override Only     |

---

## 🔧 Example: Corded Drill Press  
- Byte 1: `01000000` → Stationary + Electric  
- Byte 2: `00110000` → Screw Mechanism + Handle-Driven  
- Byte 3: `00000000` → Inline Form + Flat Bit  
- Byte 4: `00000001` → Impact + Alignment Needed  

---

## ✅ Status

| Feature                        | State |
|-------------------------------|-------|
| Fully unified 4-byte model     | ✅    |
| Power + mechanical abstraction | ✅    |
| Tool geometry + intent mapped  | ✅    |
| Setup logic + agent readiness  | ✅    |
| Reflex- and CRM-compatible     | ✅    |
