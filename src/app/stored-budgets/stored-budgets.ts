import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { BudgetPersonalData } from '../models/budgetpersondata';
import { ValidationService } from '../services/validation';

type SortCriteria = 'name' | 'price' | 'date';
type SortOrder = 'ascending' | 'descending';

@Component({
  selector: 'app-stored-budgets',
  imports: [FormsModule],
  templateUrl: './stored-budgets.html',
  styleUrl: './stored-budgets.css',
})
export class StoredBudgets {
  name = '';
  phone = '';
  email = '';

  nameError = signal<string>('');
  emailError = signal<string>('');
  phoneError = signal<string>('');

  sortCriteria = signal<SortCriteria>('name');
  sortOrder = signal<SortOrder>('ascending');
  searchTerm = signal<string>('');

  budgetService = inject(BudgetService);
  validationService = inject(ValidationService);

  submitBudget(): void {
    const nameValidation = this.validationService.validateName(this.name);
    const emailValidation = this.validationService.validateEmail(this.email);
    const phoneValidation = this.validationService.validatePhone(this.phone);

    this.nameError.set(nameValidation.error);
    this.emailError.set(emailValidation.error);
    this.phoneError.set(phoneValidation.error);

    if (!nameValidation.isValid || !emailValidation.isValid || !phoneValidation.isValid) {
      return;
    }

    const newBudget: BudgetPersonalData = {
      id: crypto.randomUUID(),
      name: this.name,
      phone: Number(this.phone),
      email: this.email,
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
    let budgets = this.budgetService.budgetDB();
    const search = this.searchTerm().toLowerCase();

    if (search) {
      budgets = budgets.filter((budget) => budget.name.toLowerCase().includes(search));
    }

    budgets = [...budgets];

    const criteria = this.sortCriteria();

    switch (criteria) {
      case 'name':
        budgets.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        budgets.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case 'date':
        budgets.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
    }

    if (this.sortOrder() === 'descending') {
      budgets.reverse();
    }

    return budgets;
  });

  private resetForm(): void {
    this.name = '';
    this.phone = '';
    this.email = '';
  }
}
