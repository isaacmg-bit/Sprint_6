import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Budget } from '../services/budget';

@Component({
  selector: 'app-stored-budgets',
  imports: [FormsModule],
  templateUrl: './stored-budgets.html',
  styleUrl: './stored-budgets.css',
  standalone: true,
})
export class StoredBudgets {
  name = signal<string>('');
  phone = signal<number>(0);
  email = signal<string>('');

}
