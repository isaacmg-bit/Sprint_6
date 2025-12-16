import { Component, signal } from '@angular/core';
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
  selectedBudgets: string[] = [];

  constructor() {
    this.budgetForm = new FormGroup({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });

    this.budgetForm.valueChanges.subscribe((values) => {
      this.selectedBudgets = [];

      if (values.seo) this.selectedBudgets.push('seo');
      if (values.ads) this.selectedBudgets.push('ads');
      if (values.web) this.selectedBudgets.push('web');

      console.log('Clicked:', this.selectedBudgets);
      console.log(this.selectedBudgets);
    });
  }
}
