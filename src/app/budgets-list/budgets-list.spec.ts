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

  it('should initialize selectedBudgets as empty', () => {
    expect(component.selectedBudgets().length).toBe(0);
  });

  it('should update selectedBudgets when form changes', async () => {
    vi.spyOn(budgetService, 'updateSelectedFromForm').mockReturnValue([component.budgets()[0]]);

    component.budgetForm.patchValue({ seo: true });
    await fixture.whenStable();

    expect(component.selectedBudgets().length).toBe(1);
  });

  it('should call urlService.updateURL on form change', async () => {
    const spy = vi.spyOn(urlService, 'updateURL');

    component.budgetForm.patchValue({ seo: true });
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
  });
});
