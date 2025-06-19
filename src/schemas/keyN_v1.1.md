---
title: keyN_v1.1.md
category: identity
status: stable
---

# keyN_v1.1.md

## Purpose

The `keyN` capsule encodes a **symbolic cryptographic or verification key reference**, used to:

* Sign or verify capsules
* Link a profile or agent to a trust signature
* Support federated or session identity
* Symbolically compress credential references without exposing raw key material

**Size:** 4 bytes

---

## Byte Structure

| Byte | Field(s)                                         | Description                         |
| ---- | ------------------------------------------------ | ----------------------------------- |
| 1    | `key_type` (4 bits) + `auth_class` (4 bits)      | Nature of key + issuing authority   |
| 2    | `sig_strength` (4 bits) + `scope_flags` (4 bits) | Trust strength + verification scope |
| 3    | `issuer_ref` (8 bits)                            | Issuer identity or symbolic handle  |
| 4    | `key_hash`                                       | Signature reference or lookup hash  |

---

## Byte 1 — Key Type + Authority Class

### `key_type` (0–3 bits)

* `0x0` = System Symbolic Key
* `0x1` = Public Signature Key
* `0x2` = API Credential
* `0x3` = Encrypted Identity Handle
* `0x4` = OAuth/Federated Identity
* `0x5–F` = Reserved

### `auth_class` (4–7 bits)

* `0x0` = System Internal
* `0x1` = Platform (e.g., OpenAI, AWS)
* `0x2` = Customer-Owned
* `0x3` = Third-Party Issuer
* `0x4` = DAO / Blockchain
* `0x5–F` = Reserved

---

## Byte 2 — Trust Strength + Scope Flags

### `sig_strength`

* `0x0` = None / Unverified
* `0x1` = Weak (untrusted)
* `0x2` = Moderate (user-linked)
* `0x3` = Strong (verified crypto)
* `0x4` = Immutable (blockchain/ledger)

### `scope_flags` (bitfield)

* Bit 0 = Can verify `profileN`
* Bit 1 = Can verify `agentN`
* Bit 2 = Can sign `eventN`
* Bit 3 = Can sign `quoteN` / `jobN`
* Bit 4 = Can verify all capsule types

---

## Byte 3 — Issuer Ref

Symbolic reference to key origin:

| Code | Meaning                  |
| ---- | ------------------------ |
| 0x00 | System Generator         |
| 0x01 | Platform Identity Server |
| 0x02 | Internal CRM             |
| 0x10 | Verified Customer Import |
| 0x20 | Partner / Integration    |
| 0x40 | Self-Issued              |

---

## Byte 4 — Key Hash / Reference

Symbolic compressed reference, not actual key:

* `0x00` = Null / No Key
* `0xFF` = Eternal Signature
* `0x01–0xFE` = Session- or Actor-linked symbolic ID

---

## Sample Encodings

**Verified system-issued agent key, full capsule access**  
→ `0x00 31 00 2A`

**OAuth-linked federated signature for quoting, moderate trust**  
→ `0x41 21 01 1F`

---

## Reference Use

Used optionally in:

* `agentN` → links to runtime verification
* `profileN` → high-trust ID compression
* `eventN`, `quoteN`, `metaN` → for audit trail, fraud-proofing

Pairs with: `originN`, `traceN`, `badgeN`

---

## Summary

`keyN` gives identity capsules cryptographic optionality — compact, verifiable signature tagging for secure trust flows, platform integration, and system-authenticated capsule chains.
