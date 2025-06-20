// src/schemas/index.ts

import { schema as actor } from './actor'
import { schema as object } from './object'
import { schema as script } from './script'
import { schema as site } from './site'
import { schema as job } from './job'
import { schema as rule } from './rule'
import { schema as plan } from './plan'
import { schema as event } from './event'
import { schema as meta } from './meta'

export const schemaMap = {
  actor,
  object,
  script,
  site,
  job,
  rule,
  plan,
  event,
  meta,
}

export type SchemaKey = keyof typeof schemaMap
