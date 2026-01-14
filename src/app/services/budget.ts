import { Injectable, signal, computed } from '@angular/core';
import { Budgets } from '../models/budgets';
import { BudgetPersonalData } from '../models/budgetpersondata';
import { BudgetFormValues } from '../models/budgetformvalues';
import { BudgetQueryParams } from '../models/budgetqueryparams';

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

  initializeFromQueryParams(
    queryParams: BudgetQueryParams,
    availableBudgets: Budgets[]
  ): Budgets[] {
    const initialSelected = availableBudgets.filter(
      (budget) => queryParams[budget.control] === 'true'
    );

    this.selectedServices.set(initialSelected);

    const pages = queryParams['pages'];
    const languages = queryParams['languages'];

    if (pages) this.currentPages.set(Number(pages));
    if (languages) this.currentLanguages.set(Number(languages));

    if (queryParams['web'] === 'true') {
      const extraPrice = this.calculateWebExtra(this.currentPages(), this.currentLanguages());
      this.webExtra.set(extraPrice);
    }

    return initialSelected;
  }

  updateSelectedFromForm(formValues: BudgetFormValues, availableBudgets: Budgets[]): Budgets[] {
    const selected = availableBudgets.filter((service) => formValues[service.control]);

    if (!formValues.web) {
      this.resetWebExtra();
    }

    this.selectedServices.set(selected);

    return selected;
  }
}
