# Staging readiness checklist

The connected Supabase project is currently environment-unknown. Treat it as protected: do not create QA identities or synthetic records there.

## 1. Create an isolated project

- Create a dedicated Supabase project or branch for non-production QA.
- Record its project reference separately from the current environment-unknown project.
- Confirm that billing, data, Auth users, Storage objects, and integrations are isolated.

## 2. Configure deployment variables

Set these variables only in the staging deployment/environment. Never commit their values:

```text
NEXT_PUBLIC_APP_ENV=staging
NEXT_PUBLIC_SUPABASE_URL=<STAGING_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<STAGING_SUPABASE_CLIENT_KEY>
SUPABASE_PROJECT_REF=<STAGING_PROJECT_REF>
STAGING_SUPABASE_PROJECT_REF=<STAGING_PROJECT_REF>
```

Production must use `NEXT_PUBLIC_APP_ENV=production` and its own Supabase URL/client key. The service-role/secret key is server-only and must never use a `NEXT_PUBLIC_*` name.

## 3. Apply the schema safely

- Apply the existing files in `supabase/migrations/` to the fresh staging project.
- Confirm tables exist for profiles, organizations, organization_members, properties, property_media, property_features, property_favorites, property_views, leads, inquiries, appointments, investment_projects, investment_documents, investment_interests, documents, notifications, audit_logs, and system_settings.
- Confirm RLS is enabled and policies are present; do not replace policies with broad `USING (true)` rules.
- Confirm Storage buckets `plutonium-public` (public) and `plutonium-private` (private), including their existing policies.

The foundation migration contains fictional demo property seed rows. Apply it only to the isolated staging project.

## 4. Verify before QA data

- Verify the Supabase project reference matches `STAGING_SUPABASE_PROJECT_REF`.
- Verify Auth signup/login and the redirect URL.
- Verify public Storage reads and private Storage ownership rules.
- Verify role/profile creation and staff/investor authorization.
- Confirm `assertQaEnvironment()` succeeds. It refuses all QA operations unless the app environment is `staging` and both project-reference variables match.

## 5. Future QA identities

Only after the checks above pass, create synthetic accounts with generated credentials stored outside Git:

- `QA_USER`
- `QA_INVESTOR`
- `QA_STAFF`
- `QA_ADMIN`

Use them only in staging. Never use real customer credentials or production accounts. Remove the accounts and synthetic data after QA according to the staging retention policy.
