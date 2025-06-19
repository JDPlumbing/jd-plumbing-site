---
title: memoN_v1.2.md
category: interaction capsule
status: stable
---

## Capsule: `memoN`

**Purpose:** Freeform Notes + Agent Reflection Capsule. Enables memory externalization, follow-up review, scratchpad behavior, or post-mortem annotations.

---

### 🔑 Identity

```yaml
uid_ref: traceN  # Optional UID to enable note linking, reflex feedback, or historical review
source_profile: profileN # Identity of agent/human capturing the memo
origin_ref: originN      # Where the note originated or was entered
key_ref: keyN            # Optional override or trust signature
```

---

## 🧠 Overview
`memoN` stores **voice notes**, **freeform thoughts**, **sales hunches**, or **field irregularities** that don’t fit structured capsules.

It enables:
- Agent memory externalization ("Note to self...")
- Reviewable logs for follow-up or escalation
- Scratchpad use during quoting, walkthroughs, or service
- Voice-to-text integration, post-mortems, or sales nuance capture

---

## 🔣 Byte Layout

### Byte 1 — `memo_type` + `capsule_link`
| Bits | Field           | Description                          |
|------|------------------|--------------------------------------|
| 0–3  | `memo_type`        | What kind of note this is            |
| 4–7  | `capsule_link`     | What context it's tied to            |

#### `memo_type`
| Value | Type of Note               |
|--------|-----------------------------|
| 0000   | General Observation         |
| 0001   | Sales Insight / Hunch       |
| 0010   | Field Irregularity          |
| 0011   | Equipment Condition Note    |
| 0100   | Customer Behavior Note      |
| 0101   | Quote Justification         |
| 0110   | Personal Reminder           |
| 0111   | Unknown                     |

#### `capsule_link`
| Value | Linked Capsule              |
|--------|------------------------------|
| 0000   | quoteN                      |
| 0001   | jobN                        |
| 0010   | chatN / convo               |
| 0011   | tripN or routeN             |
| 0100   | faultN                      |
| 0101   | teamN                       |
| 0110   | mapN / zoneN                |
| 0111   | None                        |

---

### Byte 2 — `input_mode` + `review_flag`
| Bits | Field           | Description                          |
|------|------------------|--------------------------------------|
| 0–3  | `input_mode`       | How the memo was recorded            |
| 4–7  | `review_flag`      | Visibility / follow-up signal        |

#### `input_mode`
| Value | Input Origin               |
|--------|-----------------------------|
| 0000   | Voice-to-Text              |
| 0001   | Typed (Mobile)             |
| 0010   | Desktop / CRM Portal       |
| 0011   | Synced via External Note   |
| 0100   | LLM-Generated Summary      |
| 0101   | Auto-Log via Trigger       |
| 0110   | Hybrid Input               |
| 0111   | Unknown                    |

#### `review_flag`
| Value | Note Handling               |
|--------|-----------------------------|
| 0000   | Internal Use Only          |
| 0001   | Show to Supervisor         |
| 0010   | Show to Sales Lead         |
| 0011   | Flag for Call-Back         |
| 0100   | Archive After Job          |
| 0101   | Log to ReflectN            |
| 0110   | Add to Training            |
| 0111   | No Action / Passive        |

---

### Byte 3 — `agent_emotion` + `urgency_score`
| Bits | Field           | Description                          |
|------|------------------|--------------------------------------|
| 0–3  | `agent_emotion`    | Tone or sentiment if inferred        |
| 4–7  | `urgency_score`    | Importance of this note              |

#### `agent_emotion`
| Value | Sentiment Tag               |
|--------|-----------------------------|
| 0000   | Neutral                    |
| 0001   | Frustrated                 |
| 0010   | Concerned                  |
| 0011   | Confident                  |
| 0100   | Cautious                   |
| 0101   | Distracted / Tired         |
| 0110   | Delighted / Surprised      |
| 0111   | Unknown                    |

#### `urgency_score`
| Value | Memo Priority               |
|--------|-----------------------------|
| 0000   | FYI Only                   |
| 0001   | Useful Later               |
| 0010   | Should Review              |
| 0011   | Needs Action Soon          |
| 0100   | Urgent Follow-Up           |
| 0101   | Escalate Immediately       |
| 0110   | Archive on Completion      |
| 0111   | Unknown                    |

---

## ✅ Status
| Feature                               | State |
|---------------------------------------|--------|
| Freeform agent/tech note capture      | ✅      |
| Voice input, chat, and CRM sync       | ✅      |
| Emotion and priority tagging          | ✅      |
| Review and escalation workflow        | ✅      |
| Links to any capsule (job, quote...)  | ✅      |
| Identity capsule references embedded  | ✅      |
