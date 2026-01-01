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
  currentPages = signal<number>(1);
  currentLanguages = signal<number>(1);
  private readonly PRICE_PER_UNIT = 30;
  readonly totalPrice = computed(() => {
    const servicesPrice = this.selectedServices().reduce(
      (sum: number, service: Budgets) => sum + service.price,
      0
    );
    return servicesPrice + this.webExtra();
  });

  calculateWebExtra(pages: number, languages: number): number {
    this.currentPages.set(pages);
    this.currentLanguages.set(languages);
    return pages * languages * this.PRICE_PER_UNIT;
  }

  resetWebExtra(): void {
    this.webExtra.set(0);
    this.currentPages.set(1);
    this.currentLanguages.set(1);
  }

  addBudget(budget: BudgetPersonalData): void {
    this.budgetDB.update((current) => [...current, budget]);
  }
}
