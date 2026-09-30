export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ProfileRole = 'super_admin' | 'admin' | 'property_manager' | 'agent' | 'investor' | 'buyer' | 'tenant' | 'viewer'
export type ProfileStatus = 'active' | 'inactive' | 'suspended' | 'pending'
export type DatabasePropertyCategory = 'luxury' | 'medium' | 'affordable' | 'social_impact' | 'commercial' | 'land'
export type DatabasePropertyType = 'apartment' | 'house' | 'villa' | 'townhouse' | 'office' | 'commercial' | 'land' | 'warehouse' | 'development'
export type DatabasePropertyStatus = 'draft' | 'pending_review' | 'published' | 'reserved' | 'sold' | 'rented' | 'archived'
export type PropertyMediaType = 'image' | 'video' | '360_exterior' | '360_interior' | 'floorplan' | 'document'
export type LeadType = 'buyer' | 'tenant' | 'investor' | 'seller' | 'partner' | 'general'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'viewing' | 'proposal' | 'negotiation' | 'converted' | 'lost'
export type AppointmentType = 'property_viewing' | 'investor_meeting' | 'consultation' | 'virtual_tour'
export type AppointmentStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type InvestmentProjectStatus = 'draft' | 'open' | 'funding' | 'funded' | 'active' | 'completed' | 'cancelled'

export interface DatabaseRecord { id: string; created_at: string; updated_at?: string }
export interface Profile extends DatabaseRecord { id: string; first_name: string | null; last_name: string | null; phone: string | null; avatar_url: string | null; role: ProfileRole; status: ProfileStatus; preferred_language: 'pt' | 'en'; country: string | null }
export interface Organization extends DatabaseRecord { name: string; slug: string; type: string; status: string }
export interface OrganizationMember extends DatabaseRecord { organization_id: string; user_id: string; role: string }
export interface LocalizedFields { title_pt?: string | null; title_en?: string | null; description_pt?: string | null; description_en?: string | null }
export interface DatabaseProperty extends DatabaseRecord, LocalizedFields { title: string; slug: string; description: string; property_type: DatabasePropertyType; category: DatabasePropertyCategory; status: DatabasePropertyStatus; price: number | null; currency: 'AOA' | 'USD'; country: string; province: string; municipality: string; neighborhood: string; address: string | null; latitude: number | null; longitude: number | null; bedrooms: number | null; bathrooms: number | null; parking_spaces: number | null; built_area_m2: number | null; land_area_m2: number | null; year_built: number | null; is_featured: boolean; is_verified: boolean; is_published: boolean; owner_id: string | null; agent_id: string | null }
export interface PropertyMedia extends DatabaseRecord { property_id: string; media_type: PropertyMediaType; storage_path: string; public_url: string | null; alt_text: string | null; sort_order: number; is_primary: boolean }
export interface PropertyFeature extends DatabaseRecord { property_id: string; feature: string; sort_order: number }
export interface PropertyFavorite { id: string; user_id: string; property_id: string; created_at: string }
export interface PropertyView { id: string; property_id: string; user_id: string | null; session_id: string | null; created_at: string }
export interface Lead extends DatabaseRecord { name: string; email: string; phone: string | null; company: string | null; source: string | null; property_id: string | null; investment_project_id: string | null; lead_type: LeadType; status: LeadStatus; assigned_to: string | null; notes: string | null }
export interface Inquiry extends DatabaseRecord { user_id: string | null; property_id: string | null; investment_project_id: string | null; name: string; email: string; phone: string | null; message: string; status: string; assigned_to: string | null }
export interface Appointment extends DatabaseRecord { user_id: string | null; property_id: string | null; agent_id: string | null; appointment_type: AppointmentType; scheduled_at: string; status: AppointmentStatus; notes: string | null }
export interface InvestmentProject extends DatabaseRecord { title: string; slug: string; description: string; property_id: string | null; minimum_investment: number; target_amount: number; raised_amount: number; currency: 'AOA' | 'USD'; project_status: InvestmentProjectStatus; expected_return: string; investment_period: string; risk_disclosure: string; start_date: string; end_date: string | null }
export interface InvestmentInterest extends DatabaseRecord { user_id: string; investment_project_id: string; amount: number; currency: 'AOA' | 'USD'; status: string }
export interface Document extends DatabaseRecord { user_id: string; document_type: string; storage_path: string; file_name: string; mime_type: string; file_size: number; status: string }
export interface InvestmentDocument { id: string; investment_project_id: string; document_id: string; document_type: string; created_at: string }
export interface Notification { id: string; user_id: string; type: string; title: string; message: string; link: string | null; is_read: boolean; created_at: string }
export interface AuditLog { id: string; user_id: string | null; action: string; entity_type: string; entity_id: string | null; old_values: Json; new_values: Json; ip_address: string | null; user_agent: string | null; created_at: string }
export interface SystemSetting extends DatabaseRecord { key: string; value: Json }

export type DatabaseTable = { [K in keyof DatabaseTables]: DatabaseTables[K] }
export interface DatabaseTables { profiles: Profile; organizations: Organization; organization_members: OrganizationMember; properties: DatabaseProperty; property_media: PropertyMedia; property_features: PropertyFeature; property_favorites: PropertyFavorite; property_views: PropertyView; leads: Lead; inquiries: Inquiry; appointments: Appointment; investment_projects: InvestmentProject; investment_documents: InvestmentDocument; investment_interests: InvestmentInterest; documents: Document; notifications: Notification; audit_logs: AuditLog; system_settings: SystemSetting }
