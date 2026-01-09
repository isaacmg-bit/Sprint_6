import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsList } from './budgets-list';
import { BudgetService } from '../services/budget';
import { provideRouter, Router } from '@angular/router';

describe('BudgetsList', () => {
  let component: BudgetsList;
  let fixture: ComponentFixture<BudgetsList>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsList],
      providers: [
        BudgetService,
        provideRouter([]), // Necesario porque el componente usa Router y ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsList);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    await fixture.whenStable();
  });

  it('should create the BudgetsList component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the budgets signal with the budgets list in it', () => {
    expect(component.budgets().length).toBe(3);
    expect(component.budgets()[0].id).toBe('seo-budget');
    expect(component.budgets()[1].id).toBe('ads-budget');
    expect(component.budgets()[2].id).toBe('web-budget');
  });

  it('should initialize with empty selectedBudgets', () => {
    expect(component.selectedBudgets().length).toBe(0);
  });

  it('should initialize total as 0', () => {
    expect(budgetService.totalPrice()).toBe(0);
  });

  it('should update selectedBudgets when a checkbox is selected', () => {
    component.budgetForm.patchValue({ seo: true });
    fixture.detectChanges();
    expect(component.selectedBudgets().length).toBe(1);
    expect(component.selectedBudgets()[0].id).toBe('seo-budget');
  });

  it('should calculate total correctly when budgets are selected', () => {
    component.budgetForm.patchValue({ seo: true, ads: true });
    fixture.detectChanges();
    expect(budgetService.totalPrice()).toBe(700);
  });

  it('should reset webExtra when web checkbox is unchecked', () => {
    const resetSpy = vi.spyOn(budgetService, 'resetWebExtra');
    component.budgetForm.patchValue({ web: true });
    fixture.detectChanges();
    component.budgetForm.patchValue({ web: false });
    fixture.detectChanges();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should clear query params when no budgets are selected', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.budgetForm.patchValue({ seo: false, ads: false, web: false });
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([], {
      queryParams: {},
      replaceUrl: true,
    });
  });
});
