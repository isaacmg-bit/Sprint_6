import { Component, signal, inject, effect, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BudgetService } from '../services/budget';
import { UrlService } from '../services/url-service';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';
import { ActivatedRoute } from '@angular/router';
import { BudgetFormValues } from '../models/budgetformvalues';
import { BudgetQueryParams } from '../models/budgetqueryparams';

const DEFAULT_BUDGETS: Budgets[] = [
  {
    id: 'seo-budget',
    name: 'Seo',
    price: 300,
    control: 'seo',
    description: "Programació d'una web responsive completa",
  },
  {
    id: 'ads-budget',
    name: 'Ads',
    price: 400,
    control: 'ads',
    description: "Programació d'una web responsive completa",
  },
  {
    id: 'web-budget',
    name: 'Web',
    price: 500,
    control: 'web',
    description: "Programació d'una web responsive completa",
  },
];

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  private readonly urlService = inject(UrlService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly budgetService = inject(BudgetService);
  readonly budgets = signal<Budgets[]>(DEFAULT_BUDGETS);
  readonly selectedBudgets = signal<Budgets[]>([]);
  readonly budgetForm = new FormGroup({
    seo: new FormControl(false, { nonNullable: true }),
    ads: new FormControl(false, { nonNullable: true }),
    web: new FormControl(false, { nonNullable: true }),
  });

  constructor() {
    this.initializeBudgets();
    this.setupFormSubscription();
    this.setupSyncEffect();
  }

  private initializeBudgets(): void {
    const queryParams = this.route.snapshot.queryParams;
    const initialSelected = this.budgetService.initializeFromQueryParams(
      queryParams,
      this.budgets()
    );
    this.selectedBudgets.set(initialSelected);
    this.updateFormFromParams(queryParams);
  }

  private updateFormFromParams(params: BudgetQueryParams): void {
    this.budgetForm.patchValue({
      seo: params['seo'] === 'true',
      ads: params['ads'] === 'true',
      web: params['web'] === 'true',
    });
  }

  private setupFormSubscription(): void {
    this.budgetForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      this.updateSelectedBudgets(values as BudgetFormValues);
      this.urlService.updateURL(values as BudgetFormValues);
    });
  }

  private updateSelectedBudgets(formValues: BudgetFormValues): void {
    const selected = this.budgetService.updateSelectedFromForm(formValues, this.budgets());
    this.selectedBudgets.set(selected);
  }

  private setupSyncEffect(): void {
    effect(() => {
      this.budgetService.currentPages();
      this.budgetService.currentLanguages();
      this.urlService.updateURL(this.budgetForm.value as BudgetFormValues);
    });
  }
}
