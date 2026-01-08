import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { BudgetPersonalData } from '../models/budgetpersondata';

type SortCriteria = 'name' | 'price' | 'date';
type SortOrder = 'ascending' | 'descending';

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
  sortCriteria = signal<SortCriteria>('name');
  sortOrder = signal<SortOrder>('ascending');
  searchTerm = signal<string>('');

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
  }

  setSortCriteria(criteria: SortCriteria): void {
    if (this.sortCriteria() === criteria) {
      this.sortOrder.update((order) => (order === 'ascending' ? 'descending' : 'ascending'));
    } else {
      this.sortCriteria.set(criteria);
      this.sortOrder.set('ascending');
    }
  }

  sortedBudgets = computed(() => {
    const criteria = this.sortCriteria();
    const order = this.sortOrder();
    let budgets = [...this.budgetService.budgetDB()];
    const search = this.searchTerm().toLowerCase();

    if (search) {
      budgets = budgets.filter((budget) => budget.name.toLowerCase().includes(search));
    }

    if (criteria === 'name') {
      budgets.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'price') {
      budgets.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (criteria === 'date') {
      budgets.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    return order === 'descending' ? budgets.reverse() : budgets;
  });

  private resetForm(): void {
    this.name.set('');
    this.phone.set('');
    this.email.set('');
  }
}
