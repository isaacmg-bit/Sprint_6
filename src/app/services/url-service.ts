import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from './budget';
import { BudgetFormValues } from '../models/budgetformvalues';
import { BudgetQueryParams } from '../models/budgetqueryparams';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private router = inject(Router);
  private budgetService = inject(BudgetService);

  updateURL(formValues: BudgetFormValues): void {
    const currentPages = this.budgetService.currentPages();
    const currentLanguages = this.budgetService.currentLanguages();
    const queryParams: BudgetQueryParams = {};

    if (!formValues.seo && !formValues.ads && !formValues.web) {
      this.router.navigate([], {
        queryParams: {},
        replaceUrl: true,
      });
      return;
    }

    if (formValues.seo) queryParams['seo'] = 'true';
    if (formValues.ads) queryParams['ads'] = 'true';

    if (formValues.web) {
      queryParams['web'] = 'true';

      if (currentPages > 1 || currentLanguages > 1) {
        queryParams['pages'] = String(currentPages);
        queryParams['languages'] = String(currentLanguages);
      }
    }
    this.router.navigate([], {
      queryParams,
      replaceUrl: true,
    });
  }
}
