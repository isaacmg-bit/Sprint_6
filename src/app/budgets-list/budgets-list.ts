import { Component, signal, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  budgetService = inject(BudgetService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
    });
  }

  updateURL(): void {
    const formValues = this.budgetForm.value;
    const currentPages = this.budgetService.currentPages();
    const currentLanguages = this.budgetService.currentLanguages();

    const queryParams: any = {};

    if (formValues.seo) {
      queryParams['seo'] = true;
    }
    if (formValues.ads) {
      queryParams['ads'] = true;
    }
    if (formValues.web) {
      queryParams['web'] = true;

      if (currentPages > 1 || currentLanguages > 1) {
        queryParams['pages'] = currentPages;
        queryParams['languages'] = currentLanguages;
      }
    }
    this.router.navigate([], {
      queryParams,
    });
  }

  readonly budgetForm = new FormGroup({
    seo: new FormControl(false, { nonNullable: true }),
    ads: new FormControl(false, { nonNullable: true }),
    web: new FormControl(false, { nonNullable: true }),
  });

  budgets = signal<Budgets[]>([
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
  ]);

  selectedBudgets = signal<Budgets[]>([]);

  constructor() {
    this.budgetForm.valueChanges.subscribe((values) => {
      const selected = this.budgets().filter((service) => values[service.control]);
      if (!values.web) {
        this.budgetService.resetWebExtra();
      }
      this.selectedBudgets.set(selected);
      this.budgetService.selectedServices.set(selected);
      this.updateURL();
    });
    effect(() => {
      this.budgetService.currentPages();
      this.budgetService.currentLanguages();

      this.updateURL();
    });
  }
}
