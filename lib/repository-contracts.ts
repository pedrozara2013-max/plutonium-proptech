import type { Appointment, InvestmentProject, Lead, Property, PropertyFilters, PropertyPage, PropertySort, UserProfile } from '@/types/domain'

export interface PropertyRepository {
  getProperties(filters?: PropertyFilters, pagination?: { page: number; pageSize: number }, sort?: PropertySort): Promise<PropertyPage>
  getPropertyBySlug(slug: string): Promise<Property | null>
  getSimilarProperties(property: Property, limit?: number): Promise<Property[]>
  createProperty(input: unknown): Promise<Property>
  updateProperty(id: string, input: unknown): Promise<Property>
  deleteProperty(id: string): Promise<void>
  publishProperty(id: string): Promise<Property>
}

export interface LeadRepository {
  createLead(input: unknown): Promise<Lead>
  getLeads(filters?: Record<string, string>): Promise<Lead[]>
  updateLead(id: string, input: unknown): Promise<Lead>
}

export interface AppointmentRepository {
  createAppointment(input: unknown): Promise<Appointment>
  getAppointments(filters?: Record<string, string>): Promise<Appointment[]>
  updateAppointment(id: string, input: unknown): Promise<Appointment>
}

export interface InvestmentRepository {
  getInvestmentProjects(): Promise<InvestmentProject[]>
  getInvestmentProjectBySlug(slug: string): Promise<InvestmentProject | null>
  createInvestmentInterest(input: unknown): Promise<unknown>
}

export interface UserRepository {
  getProfile(userId: string): Promise<UserProfile | null>
  updateProfile(userId: string, input: unknown): Promise<UserProfile>
}
