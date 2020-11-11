export const isRecord = (u: unknown): u is Record<PropertyKey, any> =>
  u != null && typeof u === "object"

export const isAny = (u: unknown): u is any => true
