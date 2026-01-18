import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget';
import { UrlService } from '../services/url-service';
import { Budgets } from '../models/budgets';
import { Panel } from '../panel/panel';
import { ActivatedRoute } from '@angular/router';

const DEFAULT_BUDGETS: Budgets[] = [
  {
    id: 'seo-budget',
    name: 'Seo',
    price: 300,
    control: 'seo',
    description: "Programació d'una web responsive completa",
  },
  {
    id: 'ads-budget',
    name: 'Ads',
    price: 400,
    control: 'ads',
    description: "Programació d'una web responsive completa",
  },
  {
    id: 'web-budget',
    name: 'Web',
    price: 500,
    control: 'web',
    description: "Programació d'una web responsive completa",
  },
];

@Component({
  selector: 'app-budgets-list',
  imports: [ReactiveFormsModule, Panel],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css',
})
export class BudgetsList {
  private readonly urlService = inject(UrlService);
  private readonly route = inject(ActivatedRoute);
  readonly budgetService = inject(BudgetService);

  readonly budgets = signal<Budgets[]>(DEFAULT_BUDGETS);

  readonly budgetForm = new FormGroup({
    seo: new FormControl(false, { nonNullable: true }),
    ads: new FormControl(false, { nonNullable: true }),
    web: new FormControl(false, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.loadFromURL();
  }

  private loadFromURL(): void {
    const params = this.route.snapshot.queryParams;

    this.budgetForm.patchValue(
      {
        seo: params['seo'] === 'true',
        ads: params['ads'] === 'true',
        web: params['web'] === 'true',
      },
      { emitEvent: false },
    );

    if (params['pages']) {
      this.budgetService.currentPages.set(Number(params['pages']));
    }
    if (params['languages']) {
      this.budgetService.currentLanguages.set(Number(params['languages']));
    }
    this.updateSelectedServices();
  }

  onCheckboxChange(): void {
    this.updateSelectedServices();

    if (!this.budgetForm.value.web) {
      this.budgetService.resetWebExtra();
    }
    this.updateURL();
  }

  private updateSelectedServices(): void {
    const formValue = this.budgetForm.value;
    const selected: Budgets[] = [];

    if (formValue.seo) selected.push(this.budgets()[0]);
    if (formValue.ads) selected.push(this.budgets()[1]);
    if (formValue.web) selected.push(this.budgets()[2]);

    this.budgetService.selectedServices.set(selected);
  }

  updateURL(): void {
    const formValue = this.budgetForm.value;

    this.urlService.updateURL({
      seo: formValue.seo ?? false,
      ads: formValue.ads ?? false,
      web: formValue.web ?? false,
    });
  }

  onPanelValuesChanged(): void {
    this.updateURL();
  }
}
