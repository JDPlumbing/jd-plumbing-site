---
title: docN_v1.1.md
category: logic capsule
status: stable
---

## Capsule: `docN`

**Purpose:** Models documents, permits, files, media, and uploads that are linked to jobs, quotes, or conversations in the drippy_ai system.

```yaml
uid_ref: traceN          # Document instance reference for linking
source_profile: profileN # Identity of uploader or trigger
origin_ref: originN      # Upload or collection method
key_ref: keyN            # Optional cryptographic check or override
```

---

## 📎 Overview
The `docN` capsule provides symbolic handles for real-world attachments. These can:
- Be linked to `trip`, `quoteN`, `jobN`, `planN`, or `chatN`
- Encode file state, trust level, purpose, and intended reflex behavior
- Be surfaced, flagged, archived, or used to trigger agent action

---

## 🔣 Byte Layout (4 bytes / 32 bits per document object)

### Byte 1 — `doc_type` + `format_class`
| Bits | Field           | Description                  |
|------|------------------|------------------------------|
| 0–3  | `doc_type`        | Category of document content |
| 4–7  | `format_class`    | File format or medium type   |

#### `doc_type`
- 0000: Permit / Regulatory
- 0001: Photo (site / damage)
- 0010: Product Spec / Cut
- 0011: Annotated PDF
- 0100: Diagram / Drawing
- 0101: Bill / Invoice
- 0110: Contract / Signature
- 0111: Field Report / Note

#### `format_class`
- 0000: PDF
- 0001: JPG / PNG
- 0010: Web URL / Share
- 0011: Spreadsheet
- 0100: Markdown / Text
- 0101: Scan / OCR Data
- 0110: CAD / Vector
- 0111: Unknown / Binary

---

### Byte 2 — `link_source` + `verification_status`
| Bits | Field                | Description                |
|------|-----------------------|----------------------------|
| 0–3  | `link_source`         | Where the file came from   |
| 4–7  | `verification_status` | Trust or validation state  |

#### `link_source`
- 0000: User Upload
- 0001: Jobsite Photo
- 0010: CRM Attachment
- 0011: URL Submission
- 0100: Inspector Upload
- 0101: Auto-Scraped
- 0110: Scanned Paper
- 0111: Unknown Origin

#### `verification_status`
- 0000: Confirmed Valid
- 0001: Needs Review
- 0010: Expired
- 0011: Fuzzy Match
- 0100: System Trusted
- 0101: User Trusted
- 0110: Rejected / Invalid
- 0111: Placeholder / Stub

---

### Byte 3 — `usage_context` + `attach_target`
| Bits | Field             | Description                      |
|------|--------------------|----------------------------------|
| 0–3  | `usage_context`     | What this doc supports or justifies |
| 4–7  | `attach_target`     | Which capsule it's linked to    |

#### `usage_context`
- 0000: Quote Justification
- 0001: Jobsite Scope
- 0010: Code Compliance
- 0011: Visual Inspection
- 0100: Warranty Documentation
- 0101: Objection Handling
- 0110: Permit Closure
- 0111: Unknown

#### `attach_target`
- 0000: `trip`
- 0001: `jobN`
- 0010: `quoteN`
- 0011: `planN`
- 0100: `phaseN`
- 0101: `chatN`
- 0110: `ruleN`
- 0111: System Meta

---

### Byte 4 — `doc_state` + `action_flag`
| Bits | Field            | Description                      |
|------|-------------------|----------------------------------|
| 0–3  | `doc_state`        | Current lifecycle or status      |
| 4–7  | `action_flag`      | What the agent should do if present |

#### `doc_state`
- 0000: New / Fresh Upload
- 0001: Reviewed
- 0010: In Use / Referenced
- 0011: Archived
- 0100: Flagged / Problematic
- 0101: Duplicate
- 0110: Deprecated / Old
- 0111: Missing Placeholder

#### `action_flag`
- 0000: Log Only
- 0001: Include in Quote
- 0010: Display to User
- 0011: Trigger scrip/rule
- 0100: Escalate to Supervisor
- 0101: Delay Phase Approval
- 0110: Require Chat Followup
- 0111: Suppress Final Invoice

---

## ✅ Status
| Feature                               | State |
|---------------------------------------|--------|
| Permit/photo/media classification     | ✅     |
| Capsule + usage linking               | ✅     |
| Verification / trust status           | ✅     |
| Agent reflex + quote support logic    | ✅     |
| Lifecycle: reviewed, archived, active | ✅     |
| Identity capsule references embedded  | ✅     |
