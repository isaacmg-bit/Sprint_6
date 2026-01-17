import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredBudgets } from './stored-budgets';

describe('StoredBudgets', () => {
  let component: StoredBudgets;
  let fixture: ComponentFixture<StoredBudgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoredBudgets],
    }).compileComponents();

    fixture = TestBed.createComponent(StoredBudgets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit budget if name or email is empty', () => {
    const spy = vi.spyOn(component.budgetService, 'addBudget');

    component.name.set('');
    component.email.set('');

    component.submitBudget();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should add a new budget and reset form', () => {
    const spy = vi.spyOn(component.budgetService, 'addBudget');

    component.name.set('Isaac');
    component.phone.set('123456789');
    component.email.set('test@test.com');

    component.submitBudget();

    expect(spy).toHaveBeenCalled();
    expect(component.name()).toBe('');
    expect(component.email()).toBe('');
    expect(component.phone()).toBe('');
  });

  it('should toggle sort order when same criteria is selected', () => {
    component.sortCriteria.set('name');
    component.sortOrder.set('ascending');

    component.setSortCriteria('name');

    expect(component.sortOrder()).toBe('descending');
  });

  it('should sort budgets by name ascending', () => {
    component.budgetService.budgetDB.set([
      { name: 'Zacarías', totalPrice: 200, date: new Date() } as any,
      { name: 'Albertito', totalPrice: 100, date: new Date() } as any,
    ]);

    component.sortCriteria.set('name');
    component.sortOrder.set('ascending');

    const result = component.sortedBudgets();

    expect(result[0].name).toBe('Albertito');
  });
});
