import { Injectable, signal, computed } from '@angular/core';
import { Budgets } from '../models/budgets';
import { BudgetPersonalData } from '../models/budgetpersondata';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  readonly webExtra = signal<number>(0);
  readonly budgetDB = signal<BudgetPersonalData[]>([]);
  readonly selectedServices = signal<Budgets[]>([]);
  private readonly PRICE_PER_UNIT = 30;
  readonly totalPrice = computed(() => {
    const servicesPrice = this.selectedServices().reduce(
      (sum: number, service: Budgets) => sum + service.price,
      0
    );
    return servicesPrice + this.webExtra();
  });

  calculateWebExtra(pages: number, languages: number): number {
    return pages * languages * this.PRICE_PER_UNIT;
  }

  resetWebExtra(): void {
    this.webExtra.set(0);
  }

  addBudget(budget: BudgetPersonalData): void {
    this.budgetDB.update((current) => [...current, budget]);
  }
}
