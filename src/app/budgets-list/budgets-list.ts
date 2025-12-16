import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budgets } from '../models/budgets';

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  budgets = signal<Budgets[]>([]);
  budgetForm: FormGroup;
  selectedBudgets = signal<Budgets[]>([]);

  total = computed(() => {
    return this.selectedBudgets().reduce((sum, budget) => sum + budget.price, 0);
  });

  constructor() {
    this.budgetForm = new FormGroup({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });

    this.budgetForm.valueChanges.subscribe((values) => {
      const selected: Budgets[] = [];

      if (values.seo) selected.push({ name: 'seo', price: 300 });
      if (values.ads) selected.push({ name: 'ads', price: 400 });
      if (values.web) selected.push({ name: 'web', price: 500 });

      this.selectedBudgets.set(selected);
      console.log('Clicked:', this.selectedBudgets(), 'Total:', this.total());
    });
  }
}
