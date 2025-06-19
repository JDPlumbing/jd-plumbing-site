---
title: clipN_v1.2.md
category: physical capsule
status: stable
--------------

## Capsule: `clip`

**Purpose:** Stores lifecycle state and historical condition of physical objects (tools, components, fixtures) across the Drippy++ environment. Not spatial. Enables reflexes based on age, wear, service, and tagging.

```yaml
uid_ref: traceN       # Symbolic UID for long-lived components or reflex targets
profile_ref: profileN # Who captured or authored the observation
origin_ref: originN   # Source method (trip, job, tool inspection)
key_ref: keyN         # Authority or condition access tag
agent_ref: agentN     # Who recorded the clip state
badge_ref: badgeN     # Field tag, inspection cert, or service override
```

---

### 🧬 Byte Layout (5 bytes / 10 x 4-bit fields)

| Byte | Fields           | Bits | Description                                                 |
| ---- | ---------------- | ---- | ----------------------------------------------------------- |
| 1    | `serial_class`   | 4    | Source of ID (e.g., QR, RFID, UUID)                         |
|      | `type_tag`       | 4    | Component type (valve, trap, pump...)                       |
| 2    | `install_epoch`  | 4    | Age category by decade or range                             |
|      | `lifespan_class` | 4    | Rated lifetime (5, 10, 20 yrs, etc)                         |
| 3    | `wear_class`     | 4    | Current wear state (light, patched, failed...)              |
|      | `status_flag`    | 4    | Active, abandoned, flagged, etc.                            |
| 4    | `service_flag`   | 4    | Repair or replacement history                               |
|      | `warranty_state` | 4    | Warranty status (valid, voided, unknown)                    |
| 5    | `link_class`     | 4    | Registry or reference method (job manifest, warranty db...) |
|      | `linked_by`      | 4    | Source of detection (scrip, sensor, gripped...)             |

---

### 🔑 Identity Layer

> Enables symbolic tracking, audit, service re-evaluation, or linking to `jobN`, `trip`, `eventN`, `tool`, or `drip` capsules.

---

### 🔄 Typical Usage

* Captures state of tools, materials, or components in the field
* Can trigger reflexes in response to wear, flagging, or replacement
* Used across `trip`, `eventN`, and `jobN` workflows

---

### 🔗 Related Capsules

* `trip`, `jobN`: Source context for observation
* `drip`: Material profile linked to this component
* `eventN`: Service or inspection log linkage
* `traceN`: Persistent identity across lifespan or replacement

---

## ✅ Status

| Feature                          | State |
| -------------------------------- | ----- |
| Lifecycle logic encoded          | ✅     |
| Full enum layout (no truncation) | ✅     |
| Identity block integrated        | ✅     |
| Compatible with reflex system    | ✅     |
