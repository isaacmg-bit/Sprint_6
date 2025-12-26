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
  private readonly MIN_PAG = 1;
  private readonly MIN_LANG = 1;

  panelForm = new FormGroup({
    pages: new FormControl(this.MIN_PAG),
    languages: new FormControl(this.MIN_LANG),
  });

  constructor(private budgetService: Budget) {
    this.panelForm.valueChanges.subscribe((values) => {
      const pages = values.pages ?? this.MIN_PAG;
      const languages = values.languages ?? this.MIN_LANG;

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
    const minVal = controlName === 'pages' ? this.MIN_PAG : this.MIN_LANG;

    if (control?.value > minVal) {
      control?.setValue(control.value - 1);
    } else {
      console.warn(`El mínim és ${minVal}`);
    }
  }
}
