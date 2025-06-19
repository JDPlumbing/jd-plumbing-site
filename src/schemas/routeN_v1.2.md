---

title: routeN_v1.2.md
category: operational capsule
status: stable
--------------

## Capsule: `routeN`

**Purpose:** Encodes both physical and symbolic dispatch paths, from job trips to system reroutes.

```yaml
uid_ref: traceN       # Symbolic lineage tracking for reroute/versioning/audit
profile_ref: profileN # Author or routing logic source
origin_ref: originN   # Source model (e.g. CRM, map)
key_ref: keyN         # Routing key or permission
agent_ref: agentN     # Who generated route logic
badge_ref: badgeN     # Mode tag, status, surge, or override reason
```

---

## 🚗 Overview

`routeN` handles real-world routing and virtual path logic:

* Job-to-job vehicle sequencing
* Surge or emergency rerouting
* CRM + syncN dispatch coordination
* Mobile-agent feedback or interruption

Designed to bridge operational tools (`trip`, `jobN`, `mapN`) with real-time decision logic.

---

## 🔹 Byte Layout (4–5 bytes)

### Byte 1 — `route_mode` + `route_type`

| Bits | Field        | Description                       |
| ---- | ------------ | --------------------------------- |
| 0–3  | `route_mode` | Drive, Walk, Remote, Hybrid       |
| 4–7  | `route_type` | Planned, Actual, Detour, Override |

#### `route_mode`

| Value | Mode            |
| ----- | --------------- |
| 0000  | Drive           |
| 0001  | Walk            |
| 0010  | Remote Dispatch |
| 0011  | Hybrid / Mixed  |

#### `route_type`

| Value | Path Status     |
| ----- | --------------- |
| 0000  | Planned         |
| 0001  | Actual          |
| 0010  | Detour          |
| 0011  | Manual Override |

---

### Byte 2 — `hop_count` + `eta_block`

| Bits | Field       | Description                           |
| ---- | ----------- | ------------------------------------- |
| 0–7  | `hop_count` | Number of stops, legs, or transitions |
| 8–15 | `eta_block` | Estimated minutes (rounded)           |

---

### Byte 3 — `link_ref`

| Bits | Field      | Description                        |
| ---- | ---------- | ---------------------------------- |
| 0–7  | `link_ref` | Job, trip, or mapN symbolic anchor |

> Enables pattern recognition by `reflectN`, sync with `crmN`, and spatial trace linkage.

---

### Byte 4 (Optional) — `route_status` + `vehicle_id`

| Bits | Field          | Description                     |
| ---- | -------------- | ------------------------------- |
| 0–3  | `route_status` | Scheduled, En Route, Delayed... |
| 4–7  | `vehicle_id`   | Which van / tech is executing   |

#### `route_status`

| Value | Status                |
| ----- | --------------------- |
| 0000  | Scheduled             |
| 0001  | En Route              |
| 0010  | Delayed               |
| 0011  | Completed             |
| 0100  | Cancelled             |
| 0101  | Faulted / Vehicle Err |
| 0110  | Needs Reassign        |
| 0111  | Unknown               |

#### `vehicle_id`

| Value | Vehicle Class         |
| ----- | --------------------- |
| 0000  | Van A                 |
| 0001  | Van B                 |
| 0010  | Emergency Unit        |
| 0011  | Tech Personal Vehicle |
| 0100  | Rental or Overflow    |
| 0101  | Non-Vehicle Walk Path |
| 0110  | Dispatcher-Assigned   |
| 0111  | Unknown               |

---

## ✅ Status

| Feature                           | State |
| --------------------------------- | ----- |
| Routing logic encoded             | ✅     |
| Detours, overrides, multi-hop     | ✅     |
| Job / CRM link supported          | ✅     |
| ETA, mode, vehicle logic captured | ✅     |
| Identity capsule integration      | ✅     |