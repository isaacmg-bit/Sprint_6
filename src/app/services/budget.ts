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

  readonly budgetDB = signal<BudgetPersonalData[]>([]);

  readonly selectedServices = signal<Budgets[]>([]);

  currentPages = signal<number>(this.DEFAULT_PAGES);
  currentLanguages = signal<number>(this.DEFAULT_LANGUAGES);

  readonly webExtra = computed(() => {
    const pages = this.currentPages();
    const languages = this.currentLanguages();

    if (pages === 1 && languages === 1) {
      return 0;
    }

    return pages * languages * this.PRICE_PER_UNIT;
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

  restoreWebConfig(queryParams: BudgetQueryParams): void {
    const pages = queryParams['pages'];
    const languages = queryParams['languages'];

    if (pages) {
      this.currentPages.set(Number(pages));
    }
    if (languages) {
      this.currentLanguages.set(Number(languages));
    }
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
