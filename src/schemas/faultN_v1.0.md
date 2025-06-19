# `faultN_v1.0.md`

**Diagnostic Pattern Recognition Capsule**  
**Size:** 4–6 bytes per fault profile  
**Zoom Level:** Contextual (linked to snip, reflectN, phaseN)

---

## 💥 Overview
`faultN` models **known failure patterns**, enabling the agent to:
- Detect common errors based on `snip` sensor triggers or `reflectN` notes
- Suggest likely causes, remedies, and time estimates
- Trigger fallback scrips or escalate phases

This capsule turns your system into a **reactive diagnostic assistant**, not just a task executor.

---

## 🔣 Byte Layout

### Byte 1 — `fault_type` + `severity_class`
| Bits | Field             | Description                           |
|------|--------------------|---------------------------------------|
| 0–3  | `fault_type`        | Category of issue                     |
| 4–7  | `severity_class`    | Urgency / risk profile                |

#### `fault_type`
| Value | Type                       |
|--------|-----------------------------|
| 0000   | Leak Detected               |
| 0001   | Flow Restriction            |
| 0010   | Electrical Fault            |
| 0011   | Corrosion / Degradation     |
| 0100   | Mechanical Jam / Seizure    |
| 0101   | Sensor / Reading Fault      |
| 0110   | Setup / Configuration Error|
| 0111   | Unknown                     |

#### `severity_class`
| Value | Level                    |
|--------|----------------------------|
| 0000   | Critical (Immediate)      |
| 0001   | Major (Same Day)          |
| 0010   | Moderate (Within 72h)     |
| 0011   | Minor (Next Routine Visit)|
| 0100   | Cosmetic / Nuisance       |
| 0101   | Inactive / Archived       |
| 0110   | False Positive            |
| 0111   | Unknown                   |

---

### Byte 2 — `detection_source` + `match_confidence`
| Bits | Field              | Description                           |
|------|---------------------|---------------------------------------|
| 0–3  | `detection_source`   | Where the issue was flagged from     |
| 4–7  | `match_confidence`   | Heuristic or symbolic match level    |

#### `detection_source`
| Value | Source               |
|--------|------------------------|
| 0000   | `snip` Sensor Alert     |
| 0001   | `reflectN` Pattern      |
| 0010   | `chatN` Message         |
| 0011   | `phaseN` Blocked        |
| 0100   | `docN` Annotation       |
| 0101   | Manual Tag              |
| 0110   | Unknown Input           |
| 0111   | System-Inferred         |

#### `match_confidence`
| Value | Likelihood               |
|--------|---------------------------|
| 0000   | Confirmed Diagnosis       |
| 0001   | Probable Match            |
| 0010   | Plausible Guess           |
| 0011   | Weak Signal               |
| 0100   | Archived Trigger          |
| 0101   | Unmatched / Experimental  |
| 0110   | Degraded Signal Quality   |
| 0111   | Unknown                   |

---

### Byte 3 — `scrip_response` + `quote_impact`
| Bits | Field              | Description                           |
|------|---------------------|---------------------------------------|
| 0–3  | `scrip_response`     | What ritual/action should respond     |
| 4–7  | `quote_impact`       | Effect on pricing / scope             |

#### `scrip_response`
| Value | Action Category       |
|--------|------------------------|
| 0000   | Escalate Phase        |
| 0001   | Trigger Backup Scrip  |
| 0010   | Require Supervisor    |
| 0011   | Pause Work Order      |
| 0100   | Force Trip Reschedule |
| 0101   | Auto-Generate `planN` |
| 0110   | Alert Customer        |
| 0111   | Log Only              |

#### `quote_impact`
| Value | Change Type            |
|--------|------------------------|
| 0000   | Add Line Item          |
| 0001   | Adjust Estimate (+%)   |
| 0010   | Remove Optional Work   |
| 0011   | Delay Quote Finalization|
| 0100   | Require Field Inspection|
| 0101   | No Impact               |
| 0110   | Archive Note Only       |
| 0111   | Unknown                 |

---

### Byte 4 — `resolution_state` + `reflect_flag`
| Bits | Field               | Description                          |
|------|----------------------|--------------------------------------|
| 0–3  | `resolution_state`    | What state is the fault currently in|
| 4–7  | `reflect_flag`        | Should this feed into `reflectN`?   |

#### `resolution_state`
| Value | Status                  |
|--------|--------------------------|
| 0000   | New / Unresolved         |
| 0001   | In Progress              |
| 0010   | Escalated                |
| 0011   | Resolved - Field Fix     |
| 0100   | Resolved - Full Replace  |
| 0101   | False Alarm              |
| 0110   | Blocked - No Access      |
| 0111   | Archived / Closed        |

#### `reflect_flag`
| Value | Feedback Route           |
|--------|--------------------------|
| 0000   | Don’t Reflect            |
| 0001   | Add to Pattern Learning  |
| 0010   | Trigger scrip/meta chain |
| 0011   | Flag for human review    |
| 0100   | Update Known Issue Bank  |
| 0101   | Save Partial Failure     |
| 0110   | Export to `metaN` log    |
| 0111   | Unknown                  |

---

## ✅ Status
| Feature                                      | State |
|----------------------------------------------|--------|
| Fault type + severity modeling               | ✅      |
| Trigger sources + confidence tiers           | ✅      |
| Suggested response + quote effect            | ✅      |
| Resolution lifecycle tracking                | ✅      |
| Feedback loop to `reflectN` and `metaN`      | ✅      |
