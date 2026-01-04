import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { BudgetPersonalData } from '../models/budgetpersondata';
import { Budgets } from '../models/budgets';

@Component({
  selector: 'app-stored-budgets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './stored-budgets.html',
  styleUrl: './stored-budgets.css',
})
export class StoredBudgets {
  name = signal<string>('');
  phone = signal<string>('');
  email = signal<string>('');

  public budgetService = inject(BudgetService);

  submitBudget(): void {
    if (!this.name() || !this.email()) return;

    const newBudget: BudgetPersonalData = {
      id: crypto.randomUUID(),
      name: this.name(),
      phone: Number(this.phone()),
      email: this.email(),
      date: new Date(),
      services: [...this.budgetService.selectedServices()],
      totalPrice: this.budgetService.totalPrice(),
      pages: this.budgetService.currentPages(),
      languages: this.budgetService.currentLanguages(),
    };

    this.budgetService.addBudget(newBudget);

    this.resetForm();

    console.log('Saved budgets:', this.budgetService.budgetDB());
  }

  private resetForm(): void {
    this.name.set('');
    this.phone.set('');
    this.email.set('');
  }
}
