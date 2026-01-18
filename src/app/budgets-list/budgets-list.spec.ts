import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsList } from './budgets-list';
import { BudgetService } from '../services/budget';
import { UrlService } from '../services/url-service';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BudgetsList', () => {
  let component: BudgetsList;
  let fixture: ComponentFixture<BudgetsList>;
  let budgetService: BudgetService;
  let urlService: UrlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsList],
      providers: [BudgetService, UrlService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsList);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    urlService = TestBed.inject(UrlService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize budgets signal', () => {
    expect(component.budgets().length).toBe(3);
    expect(component.budgets()[0].id).toBe('seo-budget');
  });

  it('should update selectedServices when checkbox changes', () => {
    component.budgetForm.patchValue({ seo: true });
    component.onCheckboxChange();

    expect(budgetService.selectedServices().length).toBe(1);
    expect(budgetService.selectedServices()[0].control).toBe('seo');
  });

  it('should call updateURL when checkbox changes', () => {
    const spy = vi.spyOn(urlService, 'updateURL');

    component.budgetForm.patchValue({ seo: true });
    component.onCheckboxChange();

    expect(spy).toHaveBeenCalled();
  });

  it('should reset webExtra when web is unchecked', () => {
    budgetService.currentPages.set(5);
    budgetService.currentLanguages.set(2);
    component.budgetForm.patchValue({ web: true });
    component.onCheckboxChange();

    expect(budgetService.webExtra()).toBe(300);

    component.budgetForm.patchValue({ web: false });
    component.onCheckboxChange();

    expect(budgetService.webExtra()).toBe(30);
  });

  it('should update URL when panel values change', () => {
    const spy = vi.spyOn(urlService, 'updateURL');

    component.onPanelValuesChanged();

    expect(spy).toHaveBeenCalled();
  });
});
