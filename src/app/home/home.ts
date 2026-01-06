import { Component } from '@angular/core';
import { BudgetsList } from '../budgets-list/budgets-list';
import { StoredBudgets } from '../stored-budgets/stored-budgets';

@Component({
  selector: 'app-home',
  imports: [BudgetsList, StoredBudgets],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
