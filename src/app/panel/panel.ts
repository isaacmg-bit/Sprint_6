import { Component, inject, effect, signal, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly destroyRef = inject(DestroyRef);
  readonly modalType = signal<keyof PanelFormValues | null>(null);
  readonly panelForm = new FormGroup({
    pages: new FormControl<number>(MIN_VALUE, { nonNullable: true }),
    languages: new FormControl<number>(MIN_VALUE, { nonNullable: true }),
  });

  constructor() {
    this.setupFormSubscription();
    this.setupSyncEffect();
  }

  private setupFormSubscription(): void {
    this.panelForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      const pages = values.pages ?? MIN_VALUE;
      const languages = values.languages ?? MIN_VALUE;
      const price = this.budgetService.calculateWebExtra(pages, languages);
      this.budgetService.webExtra.set(price);
    });
  }

  private setupSyncEffect(): void {
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

  increment(controlName: keyof PanelFormValues): void {
    this.updateControl(controlName, (value) => value + 1);
  }

  decrement(controlName: keyof PanelFormValues): void {
    this.updateControl(controlName, (value) => (value > MIN_VALUE ? value - 1 : value));
  }

  private updateControl(
    controlName: keyof PanelFormValues,
    updater: (value: number) => number
  ): void {
    const control = this.panelForm.get(controlName);
    if (control) {
      control.setValue(updater(control.value));
    }
  }

  openModal(type: keyof PanelFormValues): void {
    this.modalType.set(type);
  }

  closeModal(): void {
    this.modalType.set(null);
  }
}
