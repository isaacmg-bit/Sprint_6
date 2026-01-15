import { Injectable, signal, computed } from '@angular/core';
import { Budgets } from '../models/budgets';
import { BudgetPersonalData } from '../models/budgetpersondata';
import { BudgetFormValues } from '../models/budgetformvalues';
import { BudgetQueryParams } from '../models/budgetqueryparams';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly PRICE_PER_UNIT = 30;
  private readonly DEFAULT_PAGES = 1;
  private readonly DEFAULT_LANGUAGES = 1;

  readonly webExtra = signal<number>(0);
  readonly budgetDB = signal<BudgetPersonalData[]>([]);
  readonly selectedServices = signal<Budgets[]>([]);

  currentPages = signal<number>(this.DEFAULT_PAGES);
  currentLanguages = signal<number>(this.DEFAULT_LANGUAGES);

  readonly calculateWebExtra = computed(() => {
    return this.currentPages() * this.currentLanguages() * this.PRICE_PER_UNIT;
  });

  readonly totalPrice = computed(() => {
    const servicesPrice = this.selectedServices().reduce((sum, service) => sum + service.price, 0);

    return servicesPrice + this.webExtra();
  });

  resetWebExtra(): void {
    this.currentPages.set(this.DEFAULT_PAGES);
    this.currentLanguages.set(this.DEFAULT_LANGUAGES);
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
      this.webExtra.set(this.calculateWebExtra());
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
