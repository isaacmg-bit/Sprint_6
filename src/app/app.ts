import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetsList } from "./budgets-list/budgets-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetsList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sprint_6');
}
