export type ServiceType = 'seo' | 'ads' | 'web';

export interface Budgets {
  name: string;
  price: number;
  id: string;
  control: ServiceType;
  description: string;
}
