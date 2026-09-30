const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isUuid(value: string) {
  return uuidPattern.test(value)
}

export function normalizeText(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength)
}

export function isEmail(value: string) {
  return value.length <= 254 && emailPattern.test(value)
}

export function parseBoundedNumber(value: unknown, min: number, max: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : null
}

export function safeErrorMessage(fallback: string) {
  return fallback
}

export const validationLimits = {
  name: 80,
  description: 5000,
  notes: 2000,
  phone: 24,
} as const

export function isAllowedLanguage(value: unknown): value is 'pt' | 'en' {
  return value === 'pt' || value === 'en'
}

export function isAllowedFileName(value: string) {
  return value.length <= 180 && !value.includes('..') && !/[\\/]/.test(value)
}

export function isAllowedDocumentType(value: string) {
  return ['application/pdf', 'image/jpeg', 'image/png'].includes(value)
}

export function isAllowedDocumentSize(value: number) {
  return value > 0 && value <= 10 * 1024 * 1024
}

export function isSafeRedirectPath(value?: string) {
  return !value || (value.startsWith('/') && !value.startsWith('//'))
}

export function validateUuid(value: unknown) {
  const normalized = normalizeText(value, 64)
  return isUuid(normalized) ? normalized : null
}

export function validateEmail(value: unknown) {
  const normalized = normalizeText(value, 254).toLowerCase()
  return isEmail(normalized) ? normalized : null
}

export function validateText(value: unknown, minLength: number, maxLength: number) {
  const normalized = normalizeText(value, maxLength)
  return normalized.length >= minLength ? normalized : null
}

export function validateDate(value: unknown) {
  const normalized = normalizeText(value, 64)
  const date = new Date(normalized)
  return normalized && !Number.isNaN(date.getTime()) ? date : null
}

export function validateCurrency(value: unknown) {
  const normalized = normalizeText(value, 3).toUpperCase()
  return /^[A-Z]{3}$/.test(normalized) ? normalized : null
}

export function validateEnum<T extends string>(value: unknown, allowed: readonly T[]) {
  return allowed.includes(value as T) ? (value as T) : null
}

export function validateSlug(value: unknown) {
  const normalized = normalizeText(value, 120).toLowerCase()
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized) ? normalized : null
}

export function validateInteger(value: unknown, min: number, max: number) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : null
}

export function validateMoney(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 10_000_000_000_000 ? parsed : null
}

export function validateBoolean(value: unknown) {
  return value === true || value === false ? value : null
}

export function validatePhone(value: unknown) {
  const normalized = normalizeText(value, validationLimits.phone)
  return /^[+()\d\s.-]{7,24}$/.test(normalized) ? normalized : null
}

export function validatePassword(value: unknown) {
  const normalized = String(value ?? '')
  return normalized.length >= 8 && normalized.length <= 128 ? normalized : null
}

export function validationError() {
  return { ok: false as const, message: 'Verifique os dados introduzidos.' }
}

export function genericServerError() {
  return { ok: false as const, message: 'Não foi possível concluir a operação. Tente novamente.' }
}

export function isRecordStatus(value: unknown): value is 'draft' | 'active' | 'archived' {
  return value === 'draft' || value === 'active' || value === 'archived'
}

export function isSafeQueryValue(value: unknown, maxLength = 100) {
  return normalizeText(value, maxLength)
}

export function toNullableInteger(value: unknown, min = 0, max = 1000000) {
  if (value === '' || value == null) return null
  return validateInteger(value, min, max)
}

export function toNullableMoney(value: unknown) {
  if (value === '' || value == null) return null
  return validateMoney(value)
}

export function requireValidId(value: unknown) {
  const id = validateUuid(value)
  if (!id) throw new Error('Identificador inválido.')
  return id
}

export function requireValidSlug(value: unknown) {
  const slug = validateSlug(value)
  if (!slug) throw new Error('Slug inválido.')
  return slug
}

export function requireText(value: unknown, min: number, max: number) {
  const text = validateText(value, min, max)
  if (!text) throw new Error('Campo inválido.')
  return text
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function stripControlCharacters(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, '')
}

export function sanitizeText(value: unknown, maxLength: number) {
  return stripControlCharacters(normalizeText(value, maxLength))
}

export function validatePagination(value: unknown, max = 50) {
  return validateInteger(value ?? 20, 1, max) ?? 20
}

export function validateOffset(value: unknown) {
  return validateInteger(value ?? 0, 0, 1_000_000) ?? 0
}

export function validateSearch(value: unknown) {
  return sanitizeText(value, 100)
}

export function validateOptionalUuid(value: unknown) {
  if (value == null || value === '') return null
  return validateUuid(value)
}

export function validateOptionalText(value: unknown, maxLength: number) {
  if (value == null || value === '') return null
  return sanitizeText(value, maxLength)
}

export function validateOptionalDate(value: unknown) {
  if (value == null || value === '') return null
  return validateDate(value)
}

export function validateOptionalMoney(value: unknown) {
  if (value == null || value === '') return null
  return validateMoney(value)
}

export function validateOptionalInteger(value: unknown, min = 0, max = 1_000_000) {
  if (value == null || value === '') return null
  return validateInteger(value, min, max)
}

export function validateOptionalBoolean(value: unknown) {
  if (value == null) return false
  return value === true
}

export function validateFilePath(value: unknown) {
  const path = normalizeText(value, 512)
  return path && !path.includes('..') && !path.startsWith('/') ? path : null
}

export function validateLimit(value: unknown, max = 100) {
  return validateInteger(value, 1, max) ?? max
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`)
}

export function normalizeLocale(value: unknown): 'pt' | 'en' {
  return isAllowedLanguage(value) ? value : 'pt'
}

export function validateSortDirection(value: unknown): 'asc' | 'desc' {
  return value === 'asc' ? 'asc' : 'desc'
}

export function validateSortField<T extends string>(value: unknown, allowed: readonly T[], fallback: T) {
  return allowed.includes(value as T) ? (value as T) : fallback
}

export function createRequestId() {
  return crypto.randomUUID()
}

export function redactError(error: unknown) {
  return error instanceof Error ? error.message.slice(0, 200) : 'Unknown error'
}

export function isValidFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData
}

export function hasFile(value: unknown): value is File {
  return typeof File !== 'undefined' && value instanceof File && value.size > 0
}

export function isSafeFileExtension(value: string) {
  return /\.(pdf|png|jpe?g)$/i.test(value)
}

export function validateOrigin(value: unknown) {
  try {
    const url = new URL(String(value))
    return url.protocol === 'https:' || url.hostname === 'localhost'
  } catch {
    return false
  }
}

export function clampText(value: unknown, maxLength: number) {
  return sanitizeText(value, maxLength)
}

export function isNonEmpty(value: unknown) {
  return normalizeText(value, 1000).length > 0
}

export function validateArrayLength(value: unknown, max: number) {
  return Array.isArray(value) && value.length <= max
}

export function validateEmailOrEmpty(value: unknown) {
  if (value == null || value === '') return ''
  return validateEmail(value)
}

export function validatePhoneOrEmpty(value: unknown) {
  if (value == null || value === '') return ''
  return validatePhone(value)
}

export function validateJson(value: unknown, maxLength = 100_000) {
  const text = normalizeText(value, maxLength)
  try { return JSON.parse(text) as unknown } catch { return null }
}

export function validateTextList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value) || value.length > maxItems) return null
  return value.map((item) => sanitizeText(item, maxLength))
}

export function validatePercentage(value: unknown) {
  return validateInteger(value, 0, 100)
}

export function validateYear(value: unknown) {
  return validateInteger(value, 1900, 2200)
}

export function validateUrl(value: unknown) {
  try {
    const url = new URL(String(value))
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null
  } catch { return null }
}

export function validateObjectKey(value: unknown) {
  const key = normalizeText(value, 80)
  return /^[a-zA-Z0-9_-]+$/.test(key) ? key : null
}

export function validateCountry(value: unknown) {
  return validateText(value, 2, 80)
}

export function validateStatus(value: unknown, allowed: readonly string[]) {
  return typeof value === 'string' && allowed.includes(value) ? value : null
}

export function validateOptionalArray(value: unknown, maxItems = 20) {
  return value == null || (Array.isArray(value) && value.length <= maxItems)
}

export function validateTimestamp(value: unknown) {
  return validateDate(value)?.toISOString() ?? null
}

export function validatePublicId(value: unknown) {
  return validateUuid(value) ?? validateSlug(value)
}

export function validateTokenless(value: unknown) {
  return typeof value === 'string' && value.length < 1000 && !value.includes('Bearer ')
}

export function validateObject(value: unknown, maxKeys = 50) {
  return isPlainObject(value) && Object.keys(value).length <= maxKeys
}

export function validateFileName(value: unknown) {
  const name = normalizeText(value, 180)
  return isAllowedFileName(name) ? name : null
}

export function validateMimeType(value: unknown) {
  const type = normalizeText(value, 100)
  return isAllowedDocumentType(type) ? type : null
}

export function validateFileBytes(value: number) {
  return isAllowedDocumentSize(value)
}

export function validateBooleanString(value: unknown) {
  return value === 'true' || value === 'false' ? value === 'true' : null
}

export function validatePhoneCountry(value: unknown) {
  return validatePhone(value) && validateCountry(value)
}

export function validateRange(value: unknown, min: number, max: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= min && parsed <= max
}

export function validatePositiveInteger(value: unknown) {
  return validateInteger(value, 1, 1_000_000_000)
}

export function validateNonNegativeInteger(value: unknown) {
  return validateInteger(value, 0, 1_000_000_000)
}

export function validatePositiveMoney(value: unknown) {
  return validateMoney(value)
}

export function validateOptionalCurrency(value: unknown) {
  if (value == null || value === '') return 'AOA'
  return validateCurrency(value)
}

export function validateTextArea(value: unknown) {
  return sanitizeText(value, validationLimits.description)
}

export function validateShortText(value: unknown) {
  return sanitizeText(value, 180)
}

export function validateDisplayName(value: unknown) {
  return validateText(value, 1, validationLimits.name)
}

export function validateAuthEmail(value: unknown) {
  return validateEmail(value)
}

export function validateAuthPassword(value: unknown) {
  return validatePassword(value)
}
