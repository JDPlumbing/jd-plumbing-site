---
title: ruleN_v1.2.md
category: logic capsule
status: stable
---

## Capsule: `ruleN`

**Purpose:** Encodes constraint, safety, and regulatory logic for evaluating compliance in `drip`, `grip`, `scrip`, `quote`, and `trip` objects — without relying on copyrighted code text.

```yaml
uid_ref: traceN           # Symbolic UID for traceable rule audit trail
source_profile: profileN  # Identity of rule author or source
origin_ref: originN       # Source of the rule context (chat, job, inspector)
key_ref: keyN             # Optional validator or override credential
```

---

## 📊 Byte Layout (4 bytes / 32 bits)

### Byte 1 — `rule_class`
| Bits | Domain             | Description |
|------|--------------------|-------------|
| 0000 | General Safety     | Universal safety rules |
| 0001 | Drainage           | Slope, trap, outlet rules |
| 0010 | Supply Piping      | Pressure, access, temp, pipe size |
| 0011 | Venting            | Termination, sizing, air admittance |
| 0100 | Slope & Gravity    | Gravity-fed constraints |
| 0101 | Access/Clearance   | Working area, repair access |
| 0110 | Structural Support | Fastening, hangers, wall/ceiling |
| 0111 | Inspection Logic   | Trigger-based, conditional, recheck required |

---

### Byte 2 — `target_ref`
| Bits | Target Applies To      | Capsule Target |
|------|------------------------|----------------|
| 0000 | drip                   | Material or fitting |
| 0001 | grip                   | Tool or method restriction |
| 0010 | scrip                  | Action or sequence rule |
| 0011 | trip                   | Environmental or spatial constraint |
| 0100 | quote                  | Price justification or part logic |
| 0101 | clip                   | Timing or lifecycle constraints |
| 0110 | quip                   | Cognitive override or state |
| 0111 | snip                   | Detection, sensor or flag logic |

---

### Byte 3 — `compliance_state`
| Bits | Compliance Outcome       | Description |
|------|--------------------------|-------------|
| 0000 | Pass                     | Rule satisfied |
| 0001 | Fail                     | Rule violated |
| 0010 | Requires Inspection      | Needs human/agent verification |
| 0011 | Partially Met            | Needs override or note |
| 0100 | Exempt                   | Scoped out |
| 0101 | Not Checked              | Skipped or suppressed |
| 0110 | Unknown/Blocked          | Data insufficient |
| 0111 | Self-certify flag only   | Logged without enforcement |

---

### Byte 4 — `enforcement_scope`
| Bits | Scope / Authority         | Description |
|------|---------------------------|-------------|
| 0000 | Field best-practice       | Judgment-based |
| 0001 | Licensed contractor req   | Must be done by credentialed actor |
| 0010 | Code Inspector mandate    | Mandated inspection logic |
| 0011 | Jurisdictional (AHJ)      | Local enforcement body |
| 0100 | Manufacturer spec req     | Based on labeled product data |
| 0101 | Engineering calc req      | Must pass system model or load |
| 0110 | Insurance compliance      | Based on policy coverage rules |
| 0111 | Homeowner-only zone       | Requires disclosure but no restriction |

---

## 🧪 Sample Rule Encodings

| Rule Description                              | Bytes Encoded          |
|----------------------------------------------|------------------------|
| Trap seal depth ≥ 2"                          | 0001 0000 0001 0010    |
| Supply pipe must terminate with valve access  | 0010 0000 0001 0001    |
| Vent must terminate ≥10 ft from intake        | 0011 0000 0001 0011    |
| Drain slope ≥ 1/4" per foot                   | 0100 0000 0001 0001    |

---

## ✅ Status Table

| Feature                                | Status |
|----------------------------------------|--------|
| 4-byte schema stabilized               | ✅     |
| Cross-capsule compatible               | ✅     |
| Identity capsules linked               | ✅     |
| Reflex + override support ready        | ✅     |
| Human or AI-readable audit trail       | ✅     |
