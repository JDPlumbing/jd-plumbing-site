---
title: billN_v1.2.md
category: economic capsule
status: stable
---

## Capsule: `billN`

**Purpose:** Encodes symbolic billing state transitions, payment events, and reflex logic for quote-to-payment flows. Tracks status, method, origin, channel, and sync logic.

```yaml
uid_ref: traceN        # Unique billing transaction lineage
source_profile: profileN  # Who issued or authorized billing state
source_origin: originN    # Source of billing trigger
key_ref: keyN             # Optional cryptographic signature
```

---

## Byte Layout (4 bytes / 32 bits, 8 x 4-bit fields)

### 💳 Byte 1 — Billing Action + Quote Linkage

| Bits | Field              | Description |
|------|---------------------|-------------|
| 0–3  | `billing_event`      | Quote Finalized, Invoice Sent, Payment Received, Payment Failed, Refund Issued, Dispute Opened, Adjustment / Credit Note, Archive Entry |
| 4–7  | `quote_link_flag`    | Direct Link to Quote, Manual Invoice Only, CRM Triggered, External System Ref, Orphaned Transaction, Unknown Origin, Synthetic Entry, Unknown |

### 💰 Byte 2 — Method + Payment Status

| Bits | Field               | Description |
|------|----------------------|-------------|
| 0–3  | `payment_method`      | Card, ACH / Bank, Check, Cash, Financing / 3rd Party, Split Method, Other, Unknown |
| 4–7  | `payment_status`      | Pending, Paid in Full, Partial Payment, Failed, Refunded, Chargeback, Voided / Canceled, Unknown |

### 📤 Byte 3 — Channel + Sync Status

| Bits | Field               | Description |
|------|----------------------|-------------|
| 0–3  | `billing_channel`     | Email, Text Message, CRM Portal, Printed Invoice, Verbal / Handwritten, Embedded in Quote, External Service, Unknown |
| 4–7  | `sync_flag`           | Synced to CRM, Synced to Bookkeeping, Not Yet Synced, Failed Sync, Partial Sync, Archived Only, External Mirror Only, Unknown |

### 🔁 Byte 4 — Trigger Source + Reflex

| Bits | Field             | Description |
|------|-------------------|-------------|
| 0–3  | `bill_ref_type`     | From quoteN approval, Manually generated, Recurring logic, From syncN webhook, Customer-initiated, Job Complete trigger, Archived resurface, Unknown |
| 4–7  | `reflex_action`     | Lock quote for editing, Trigger CRM follow-up, Notify accounting, Generate receipt, Adjust next job phase, Escalate to supervisor, Re-export to syncN, None |

---

## 🔗 Integration Notes

- `billN` is directly referenced from `quoteN`, `jobN`, `crmN`, and `syncN`
- `traceN` enables symbolic lineage and recurrence modeling
- `profileN` + `originN` embed trust and actor context
- `keyN` allows signing of financial entries for audit/security layers

---

## ✅ Status

| Feature                                  | State |
|------------------------------------------|--------|
| Symbolic quote-to-payment pipeline       | ✅     |
| Payment method, status, and reflex flags | ✅     |
| Identity and sync system integration     | ✅     |
| Cryptographic readiness                  | ✅     |
| Transaction lineage support              | ✅     |
