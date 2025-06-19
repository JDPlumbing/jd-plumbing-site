---
title: mapN_v1.1.md
category: operational capsule
status: stable
--------------

## Capsule: `map`

**Purpose:** Encodes spatial awareness and zone-based layout logic for jobsites. Enables agents to model space, fixtures, navigation, and risk.

```yaml
uid_ref: traceN       # Symbolic UID for location or plan
profile_ref: profileN # Who mapped or scanned the space
origin_ref: originN   # Source of geometry: doc, drone, etc
key_ref: keyN         # Access control / location sensitivity
agent_ref: agentN     # Sensor or human that created the map
badge_ref: badgeN     # Authority or inspection body
```

---

## 🧭 Byte Structure (4 bytes)

### Byte 1 — `zone_class` + `layout_context`

| Bits | Field            | Description                  |
| ---- | ---------------- | ---------------------------- |
| 0–3  | `zone_class`     | Physical area type           |
| 4–7  | `layout_context` | Type of map / linkage method |

#### `zone_class`

| Value | Label                   |
| ----- | ----------------------- |
| 0000  | Wet Area (Bath/Kitchen) |
| 0001  | Exterior                |
| 0010  | Crawlspace / Underslab  |
| 0011  | Attic / Overhead        |
| 0100  | Utility Room / Closet   |
| 0101  | Yard / Landscape        |
| 0110  | Unfinished Area         |
| 0111  | General Room / Unknown  |

#### `layout_context`

| Value | Context Type         |
| ----- | -------------------- |
| 0000  | Floorplan Ref        |
| 0001  | Street Map Ref       |
| 0010  | 3D Scan Link         |
| 0011  | Manual Tag Only      |
| 0100  | GPS Geoframe         |
| 0101  | Fixture Tag System   |
| 0110  | Remote Video Context |
| 0111  | Unknown              |

---

### Byte 2 — `fixture_type` + `locator_flag`

| Bits | Field          | Description                    |
| ---- | -------------- | ------------------------------ |
| 0–3  | `fixture_type` | Fixture linked to the zone     |
| 4–7  | `locator_flag` | Precision or anchor confidence |

#### `fixture_type`

| Value | Fixture Type     |
| ----- | ---------------- |
| 0000  | Toilet           |
| 0001  | Lav/Sink         |
| 0010  | Tub/Shower       |
| 0011  | Hose Bibb        |
| 0100  | Water Heater     |
| 0101  | Sewer Cleanout   |
| 0110  | Valve / Manifold |
| 0111  | Unknown / Misc   |

#### `locator_flag`

| Value | Anchor Method            |
| ----- | ------------------------ |
| 0000  | Fixed on Floorplan       |
| 0001  | Relative (e.g. 3ft left) |
| 0010  | Floating / Inferred      |
| 0011  | Confirmed On-Site        |
| 0100  | GPS-linked               |
| 0101  | Temporary / Mobile       |
| 0110  | Estimated Only           |
| 0111  | Unknown                  |

---

### Byte 3 — `access_state` + `hazard_flag`

| Bits | Field          | Description                 |
| ---- | -------------- | --------------------------- |
| 0–3  | `access_state` | Site accessibility          |
| 4–7  | `hazard_flag`  | Risk level or safety hazard |

#### `access_state`

| Value | Access Condition     |
| ----- | -------------------- |
| 0000  | Clear / Accessible   |
| 0001  | Obstructed           |
| 0010  | Locked               |
| 0011  | Needs Ladder         |
| 0100  | Requires Crawl / PPE |
| 0101  | Inaccessible         |
| 0110  | Not Yet Verified     |
| 0111  | Unknown              |

#### `hazard_flag`

| Value | Hazard Type              |
| ----- | ------------------------ |
| 0000  | No Known Hazards         |
| 0001  | Asbestos / Material Risk |
| 0010  | Fall / Entry Risk        |
| 0011  | Mold / Bio               |
| 0100  | Rodent or Animal         |
| 0101  | Trip or Heat Risk        |
| 0110  | Electrical Hazard        |
| 0111  | Unknown                  |

---

### Byte 4 — `snip_link` + `phase_link`

| Bits | Field        | Description                    |
| ---- | ------------ | ------------------------------ |
| 0–3  | `snip_link`  | Sensor system tied to location |
| 4–7  | `phase_link` | Work phase active in this zone |

#### `snip_link`

| Value | Sensor Type              |
| ----- | ------------------------ |
| 0000  | Leak Sensor              |
| 0001  | Temperature Probe        |
| 0010  | Vibration / Flow Monitor |
| 0011  | Visual Inspection Tag    |
| 0100  | No Sensor                |
| 0101  | External Camera Ref      |
| 0110  | Motion / Presence        |
| 0111  | Unknown                  |

#### `phase_link`

| Value | Linked Job Phase     |
| ----- | -------------------- |
| 0000  | Rough-In             |
| 0001  | Trim-Out             |
| 0010  | Demo / Excavation    |
| 0011  | Final Inspection     |
| 0100  | Service Visit        |
| 0101  | Customer Walkthrough |
| 0110  | Unknown Phase        |
| 0111  | General / Multi-Use  |

---

## ✅ Status

| Feature                                | State |
| -------------------------------------- | ----- |
| Fixture zones and anchor types         | ✅     |
| Phase mapping and access states        | ✅     |
| Sensor + inspection trigger mapping    | ✅     |
| Risk flags + routing-ready markers     | ✅     |
| Site layout logic for scrip/task flows | ✅     |
