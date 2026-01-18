import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { PanelFormValues } from '../models/panelformvalues';

const MIN_VALUE = 1;

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  private readonly budgetService = inject(BudgetService);

  readonly modalType = signal<keyof PanelFormValues | null>(null);

  @Output() valuesChanged = new EventEmitter<void>();

  readonly panelForm = new FormGroup({
    pages: new FormControl<number>(MIN_VALUE, { nonNullable: true }),
    languages: new FormControl<number>(MIN_VALUE, { nonNullable: true }),
  });

  increment(controlName: keyof PanelFormValues): void {
    const control = this.panelForm.get(controlName);
    if (control) {
      const newValue = control.value + 1;
      control.setValue(newValue);
      this.onValueChange(controlName, newValue);
    }
  }

  decrement(controlName: keyof PanelFormValues): void {
    const control = this.panelForm.get(controlName);
    if (control && control.value > MIN_VALUE) {
      const newValue = control.value - 1;
      control.setValue(newValue);
      this.onValueChange(controlName, newValue);
    }
  }

  private onValueChange(controlName: keyof PanelFormValues, value: number): void {
    if (controlName === 'pages') {
      this.budgetService.currentPages.set(value);
    } else {
      this.budgetService.currentLanguages.set(value);
    }

    this.valuesChanged.emit();
  }

  openModal(type: keyof PanelFormValues): void {
    this.modalType.set(type);
  }

  closeModal(): void {
    this.modalType.set(null);
  }
}
