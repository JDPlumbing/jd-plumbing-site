---
title: profileN_v1.0.md
category: identity capsule
status: stable
---

## Capsule: `profileN`

**Purpose:** Encodes symbolic identity of a human, agent, or team. Stores persistent role, behavior style, capabilities, and trace lineage.

```yaml
uid_ref: traceN  # Links this identity to symbolic lineage and reuse
```

---

### Byte Structure (4 bytes / 32 bits)

| Byte | Field Name        | Bits | Description |
|------|--------------------|------|-------------|
| 1    | `actor_type`       | 4    | 0 = human<br>1 = agent<br>2 = team<br>3 = hybrid |
|      | `authority_level`  | 4    | 0 = guest<br>1 = apprentice<br>2 = standard<br>3 = master<br>4 = system |
| 2    | `role_code`        | 8    | Encodes role: plumber, CSR, dispatcher, installer, etc. |
| 3    | `style_mask`       | 8    | Bitmask for tone preferences (warm, dry, assertive, emoji, etc.) |
| 4    | `default_quip_ref` | 8    | Points to default `quip` capsule for behavioral posture |

---

### Use Cases
- Loaded into memory to seed default behavior (for agents or users)
- Referenced in `eventN`, `reflectN`, `chatN`, or `teamN`
- Can be dynamically updated with `memoN` or `learnN`

---

### Example:
```yaml
profileN:
  actor_type: 0              # human
  authority_level: 2         # standard
  role_code: 0x34            # plumber
  style_mask: 0b00101010     # warm + assertive
  default_quip_ref: 0xA1     # points to baseline behavioral mode
```

---

### Integration Notes
- `profileN` may act as a lookup object or be embedded within team rosters (`teamN`)
- Use `reflectN` to update profile trends or detect drift from baseline
- Can link to multiple `badgeN` credentials for symbolic permissioning or endorsements
