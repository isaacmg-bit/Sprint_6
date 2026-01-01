import { Budgets } from './budgets';

export interface BudgetPersonalData {
  name: string;
  phone: number;
  email: string;
  date: Date;
  services: Budgets[];
  totalPrice: number;
  pages: number;
  languages: number;
}
