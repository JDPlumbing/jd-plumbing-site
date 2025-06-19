---
title: badgeN_v1.1.md
category: identity
status: stable
---

# agentN_v1.1.md

## Overview

The `badgeN` capsule encodes **credentials, licenses, endorsements, and identity-linked qualifications** for humans, agents, or teams. It acts as a symbolic permission and trust flag system — compact, interpretable, and reflex-compatible.

* **Size:** 4 bytes
* **Scope:** Symbolic tags tied to `profileN`, optionally referenced in `teamN`, `eventN`, `chatN`, `quoteN`

---

## Byte Structure

| Byte | Field(s)                                           | Description                                      |
| ---- | -------------------------------------------------- | ------------------------------------------------ |
| 1    | `badge_class` (4 bits) + `issuer_class` (4 bits)   | Type of badge and who issued it                  |
| 2    | `symbol_ref`                                       | ID for badge (e.g., Licensed Tech, OSHA10, etc.) |
| 3    | `validity_flags` (4 bits) + `scope_flags` (4 bits) | Active, revoked, scope of applicability          |
| 4    | `issue_epoch`                                      | Compressed issuance period or symbolic timestamp |

---

## Byte 1: Class Metadata

### `badge_class` (bits 0–3)

* `0x0` = License
* `0x1` = Certification
* `0x2` = Training Completion
* `0x3` = Trust Signal
* `0x4` = Skill Tag
* `0x5` = Union Affiliation
* `0x6` = Soft Trait (e.g., language)
* `0x7–0xF` = Reserved

### `issuer_class` (bits 4–7)

* `0x0` = Government
* `0x1` = Employer
* `0x2` = Union
* `0x3` = Third Party
* `0x4` = System-Inferred
* `0x5` = Client/User Granted
* `0x6–0xF` = Reserved

---

## Byte 2: `symbol_ref`

Index into a badge symbol dictionary. Examples:

| Code | Description               |
| ---- | ------------------------- |
| 0x01 | Licensed Plumber (State)  |
| 0x02 | OSHA-10 Certified         |
| 0x03 | EPA Lead-Safe Certified   |
| 0x10 | Trusted Vendor (Internal) |
| 0x20 | Spanish-Speaking          |
| 0x30 | Backflow Certified        |

---

## Byte 3: `validity_flags` (nibble) + `scope_flags` (nibble)

### Validity Flags

* Bit 0 = Active
* Bit 1 = Revoked
* Bit 2 = Expired
* Bit 3 = Superseded

### Scope Flags

* Bit 0 = Local
* Bit 1 = Regional
* Bit 2 = National
* Bit 3 = Global

---

## Byte 4: `issue_epoch`

Compressed symbolic issue timestamp:

| Value Range | Meaning                                 |
| ----------- | --------------------------------------- |
| `0x00–0x1F` | Fixed quarters (e.g., Q1 2020)          |
| `0x20–0xFE` | Flexible epoch hash (e.g., 2024 Spring) |
| `0xFF`      | Eternal / Always Valid                  |

---

## Reference Fields

* `profileN` → `badges: [0x...]`
* `teamN` → `badges_required`
* `eventN`, `chatN`, `quoteN` → may use badges as modifiers, trust signals, or reflex conditions

---

## Sample Encodings

**Licensed Tech, State-Issued, Active, National**
`badge_class = 0x0`, `issuer_class = 0x0`, `symbol_ref = 0x01`, `validity = 1000`, `scope = 0100`, `issue_epoch = 0x24`
→ `0x00 01 84 24`

**Internal "Trusted Vendor", Eternal**
`badge_class = 0x3`, `issuer_class = 0x1`, `symbol_ref = 0x10`, `validity = 0001`, `scope = 0010`, `issue_epoch = 0xFF`
→ `0x31 10 12 FF`

---

## Summary

`badgeN` enables identity-linked credential modeling, symbolic access gating, and visible trust signaling across jobs, events, teams, and chats.
