import type { InvestmentProject } from '@/types/domain'

// Fictional demo opportunities. Expected returns are not guarantees.
export const demoInvestmentProjects: InvestmentProject[] = [
  { id: 'demo-investment-001', title: 'Kilamba Central', slug: 'kilamba-central', description: 'Projecto demonstrativo de desenvolvimento residencial.', location: 'Kilamba, Luanda', minimumInvestment: 0, targetAmount: 0, raisedAmount: 0, currency: 'AOA', projectStatus: 'draft', expectedReturn: 'A avaliar', investmentPeriod: 'A definir', riskDisclosure: 'Projecto demonstrativo. Não constitui uma oferta de investimento nem uma garantia de retorno.', startDate: '2024-01-01', endDate: null },
]

export async function listInvestmentProjects(): Promise<InvestmentProject[]> {
  return demoInvestmentProjects
}
