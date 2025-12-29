import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budget } from '../services/budget';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';
import { BudgetFormValues } from '../models/budgetformvalues';

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
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
  budgetForm: FormGroup<{
    seo: FormControl<boolean>;
    ads: FormControl<boolean>;
    web: FormControl<boolean>;
  }>;
  selectedBudgets = signal<Budgets[]>([]);

  total = computed(() => {
    const basePrice = this.selectedBudgets().reduce((sum, budget) => sum + budget.price, 0);
    const extraWebPrice = this.budgetService.webExtra();

    return basePrice + extraWebPrice;
  });

  constructor(private budgetService: Budget) {
    this.budgetForm = new FormGroup({
      seo: new FormControl<boolean>(false, { nonNullable: true }),
      ads: new FormControl<boolean>(false, { nonNullable: true }),
      web: new FormControl<boolean>(false, { nonNullable: true }),
    });

    this.budgetForm.valueChanges.subscribe((values) => {
      const selected = this.budgets().filter(
        (service) => values[service.control as keyof BudgetFormValues]
      );

      if (!values.web) {
        this.budgetService.resetWebExtra();
      }

      this.selectedBudgets.set(selected);
      console.log('Clicked:', this.selectedBudgets(), 'Total:', this.total());
    });
  }
}
