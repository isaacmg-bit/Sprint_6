import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsList } from './budgets-list';

describe('BudgetsList', () => {
  let component: BudgetsList;
  let fixture: ComponentFixture<BudgetsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsList],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsList);
    component = fixture.componentInstance;
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
    expect(component.total()).toBe(0);
  });
  it('should update selectedBudgets when a checkbox is selected', () => {
    component.budgetForm.patchValue({ seo: true });
    expect(component.selectedBudgets().length).toBe(1);
    expect(component.selectedBudgets()[0].id).toBe('seo-budget');
  });

  it('should calculate total correctly when budgets are selected', () => {
    component.budgetForm.patchValue({ seo: true, ads: true });
    expect(component.total()).toBe(700);
  });
  it('should reset webExtra when web checkbox is unchecked', () => {
    const resetSpy = vi.spyOn(component['budgetService'], 'resetWebExtra');
    component.budgetForm.patchValue({ web: true });
    component.budgetForm.patchValue({ web: false });
    expect(resetSpy).toHaveBeenCalled();
  });
});
