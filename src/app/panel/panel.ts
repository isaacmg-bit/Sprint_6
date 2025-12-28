import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budget } from '../services/budget';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  modalType: 'pages' | 'languages' | null = null;
  private readonly MIN_VAL = 1;

  panelForm = new FormGroup({
    pages: new FormControl(this.MIN_VAL),
    languages: new FormControl(this.MIN_VAL),
  });

  constructor(private budgetService: Budget) {
    this.panelForm.valueChanges.subscribe((values) => {
      const pages = values.pages ?? this.MIN_VAL;
      const languages = values.languages ?? this.MIN_VAL;

      const price = this.budgetService.calculateWebExtra(pages, languages);

      this.budgetService.webExtra.set(price);
    });
  }

  increment(controlName: string) {
    const control = this.panelForm.get(controlName);

    if (control) {
      control.setValue(control.value + 1);
    }
  }
  decrement(controlName: string) {
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
