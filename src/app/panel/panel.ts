import { Component, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { PanelFormValues } from '../models/panelformvalues';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  private readonly budgetService = inject(BudgetService);
  private readonly MIN_VAL = 1;

  modalType: keyof PanelFormValues | null = null;

  readonly panelForm = new FormGroup({
    pages: new FormControl<number>(this.MIN_VAL, { nonNullable: true }),
    languages: new FormControl<number>(this.MIN_VAL, { nonNullable: true }),
  });

  constructor() {
    this.panelForm.valueChanges.subscribe((values) => {
      const pages = values.pages ?? this.MIN_VAL;
      const languages = values.languages ?? this.MIN_VAL;

      const price = this.budgetService.calculateWebExtra(pages, languages);
      this.budgetService.webExtra.set(price);
    });

    effect(() => {
      this.panelForm.patchValue(
        {
          pages: this.budgetService.currentPages(),
          languages: this.budgetService.currentLanguages(),
        },
        { emitEvent: false }
      );
    });
  }

  increment(controlName: keyof PanelFormValues) {
    const control = this.panelForm.get(controlName);
    if (control) {
      control.setValue(control.value + 1);
    }
  }

  decrement(controlName: keyof PanelFormValues) {
    const control = this.panelForm.get(controlName);
    if (control && control.value > this.MIN_VAL) {
      control.setValue(control.value - 1);
    }
  }

  openModal(type: keyof PanelFormValues) {
    this.modalType = type;
  }

  closeModal() {
    this.modalType = null;
  }
}
