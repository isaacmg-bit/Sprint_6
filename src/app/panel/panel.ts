import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budget } from '../services/budget';
import { PanelFormValues } from '../models/panelformvalues';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  modalType: 'pages' | 'languages' | null = null;
  private readonly MIN_VAL = 1;

  panelForm = new FormGroup<{
    pages: FormControl<number>;
    languages: FormControl<number>;
  }>({
    pages: new FormControl<number>(this.MIN_VAL, { nonNullable: true }),
    languages: new FormControl<number>(this.MIN_VAL, { nonNullable: true }),
  });

  constructor(private budgetService: Budget) {
    this.panelForm.valueChanges.subscribe((values) => {
      const pages = values.pages ?? this.MIN_VAL;
      const languages = values.languages ?? this.MIN_VAL;

      const price = this.budgetService.calculateWebExtra(pages, languages);

      this.budgetService.webExtra.set(price);
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

  openModal(type: 'pages' | 'languages') {
    this.modalType = type;
  }

  closeModal() {
    this.modalType = null;
  }
}
