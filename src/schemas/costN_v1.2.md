---
title: costN_v1.2.md
category: economic capsule
status: stable
---

## Capsule: `costN`

**Purpose:** Encodes symbolic cost inputs, regional modifiers, pricing signals, and justification logic. Provides traceable influence over quote confidence, pricing elasticity, and escalation triggers.

```yaml
uid_ref: traceN          # Tracks the symbolic instance of the cost input
source_profile: profileN # Identity of the actor who triggered/modified cost
origin_ref: originN      # How the cost update was delivered or inferred
key_ref: keyN            # Optional cryptographic confirmation of source
```

---

## 💸 Overview

`costN` represents dynamic pricing data for labor, materials, fuel, regulatory, and other job-impacting financial factors. Each cost can be scoped by region, time, source reliability, and influence zone.

Used for:
- Auto-adjusting `quoteN` values based on regional or temporal surges
- Highlighting volatile or high-impact pricing variables
- Anchoring audit trails and pricing justification
- Supporting override, suppression, or reflective triggering

---

## 🔣 Byte Layout (4 bytes / 32 bits)

### Byte 1 — Cost Input Type + Volatility Class

| Bits | Field              | Description |
|------|--------------------|-------------|
| 0–3  | `input_class`       | Fuel / Travel, Part / Material, Tool Maintenance, Labor Rate, Permit / Regulatory, Shipping / Lead Time, Warranty Buffer, Insurance / Risk |
| 4–7  | `volatility_class`  | Stable (quarter+), Monthly, Weekly, Daily / Spot, Job-specific, Surge-sensitive, Customer-driven, Unknown / Variable |

### Byte 2 — Cost Band + Impact Zone

| Bits | Field           | Description |
|------|------------------|-------------|
| 0–3  | `cost_band`       | <$10, $10–50, $50–200, $200–500, $500–1000, $1k–$5k, $5k+, Dynamic / Variable |
| 4–7  | `impact_class`    | quoteN.material_class, quoteN.labor_mode, quoteN.confidence_flag, trip.distance_range, jobN.duration_est, salesN.objection_frame, risk_profile / permit, markup_model override |

### Byte 3 — Source + Adjustment Strategy

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `source_mode`      | Manual Override, Supplier Feed, Government Index, CRM Survey Response, Prior Job Reference, Internal Part Database, Market Scraper, Unknown / Inferred |
| 4–7  | `adjustment_mode`  | Log / Memo Only, Add Justification Only, Adjust Estimate Only, Adjust + Flag Confidence, Require Supervisor Confirm, Recalculate All Layers, Suppress Estimate, Trigger ReflectN Event |

### Byte 4 — Temporal + Regional Scope

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `temporal_scope`   | Single Job, Daily, Weekly, 30-day Quote Span, Quarterly, Annualized, Historical Trend, Unknown / TBD |
| 4–7  | `region_scope`     | Zip Code, City / Zone, County, State / Region, Federal, Customer-Tier Specific, Remote / Travel-Based, Global / National Avg |

---

## 🔗 Integration Notes

- `costN` capsules are consumed by `quoteN`, `salesN`, and `reflectN`
- Reflex-aware capsules may use `costN.adjustment_mode` to flag quote reliability or request manual intervention
- Combined with `boostN` or `billN` for pricing elasticity or job-specific justification logic

---

## ✅ Status

| Feature                                       | State |
|-----------------------------------------------|--------|
| Symbolic cost typing and volatility encoding  | ✅     |
| Temporal and regional scoping                 | ✅     |
| Source and reflex adjustment logic            | ✅     |
| Quote system integration and override control | ✅     |
| Identity capsule references embedded          | ✅     |
