import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetsList } from "./budgets-list/budgets-list";
import { StoredBudgets } from './stored-budgets/stored-budgets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetsList, StoredBudgets],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sprint_6');
}
