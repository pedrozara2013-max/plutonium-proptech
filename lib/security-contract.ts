export const securityPreparation = {
  rlsRequiredBeforeProduction: true,
  authorizationSource: 'server-controlled roles and ownership relationships',
  protectedRouteStrategy: 'server-side session and authorization checks',
  privateStorage: 'signed, authenticated access only',
  validation: 'validate and sanitize at the server boundary',
  rateLimiting: 'apply to public inquiries, auth, uploads, and sensitive mutations',
  auditLogging: 'record administrative and security-sensitive changes',
  clientTrust: 'never trust client-supplied roles, user IDs, or permissions',
} as const

export const auditActions = [
  'CREATE_PROPERTY', 'UPDATE_PROPERTY', 'DELETE_PROPERTY', 'PUBLISH_PROPERTY',
  'LOGIN', 'ROLE_CHANGE', 'DOCUMENT_UPLOAD', 'INVESTMENT_UPDATE',
] as const
