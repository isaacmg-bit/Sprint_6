import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  budgetService = inject(BudgetService);

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
    });
  }
}
