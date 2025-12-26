import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budget } from '../services/budget';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  budgets = signal<Budgets[]>([]);
  budgetForm: FormGroup;
  selectedBudgets = signal<Budgets[]>([]);
  services: any[];

  total = computed(() => {
    const basePrice = this.selectedBudgets().reduce((sum, budget) => sum + budget.price, 0);
    const extraWebPrice = this.budgetService.webExtra();

    return basePrice + extraWebPrice;
  });

  constructor(private budgetService: Budget) {
    this.services = [
      {
        id: 'seo-budget',
        name: 'Seo',
        description: "Programació d'una web responsive completa",
        price: 300,
        control: 'seo',
      },
      {
        id: 'ads-budget',
        name: 'Ads',
        description: "Programació d'una web responsive completa",
        price: 400,
        control: 'ads',
      },
      {
        id: 'web-budget',
        name: 'Web',
        description: "Programació d'una web responsive completa",
        price: 500,
        control: 'web',
      },
    ];

    this.budgetForm = new FormGroup({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });

    this.budgetForm.valueChanges.subscribe((values) => {
      const selected: Budgets[] = [];

      if (values.seo) selected.push({ name: 'seo', price: 300 });
      if (values.ads) selected.push({ name: 'ads', price: 400 });
      if (values.web) {
        selected.push({ name: 'web', price: 500 });
      } else {
        this.budgetService.resetWebExtra();
      }

      this.selectedBudgets.set(selected);
      console.log('Clicked:', this.selectedBudgets(), 'Total:', this.total());
    });
  }
}
