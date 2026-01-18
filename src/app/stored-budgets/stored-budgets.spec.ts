import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoredBudgets } from './stored-budgets';
import { BudgetService } from '../services/budget';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('StoredBudgets', () => {
  let component: StoredBudgets;
  let fixture: ComponentFixture<StoredBudgets>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoredBudgets],
      providers: [BudgetService],
    }).compileComponents();

    fixture = TestBed.createComponent(StoredBudgets);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit budget if name or email is empty', () => {
    const spy = vi.spyOn(budgetService, 'addBudget');

    component.name = '';
    component.email = '';
    component.submitBudget();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should add a new budget and reset form', () => {
    const spy = vi.spyOn(budgetService, 'addBudget');

    component.name = 'Isaac';
    component.phone = '123456789';
    component.email = 'test@test.com';

    component.submitBudget();

    expect(spy).toHaveBeenCalled();
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.phone).toBe('');
  });

  it('should toggle sort order when same criteria is selected', () => {
    component.sortCriteria.set('name');
    component.sortOrder.set('ascending');

    component.setSortCriteria('name');

    expect(component.sortOrder()).toBe('descending');
  });

  it('should change to new criteria and reset to ascending', () => {
    component.sortCriteria.set('name');
    component.sortOrder.set('descending');

    component.setSortCriteria('price');

    expect(component.sortCriteria()).toBe('price');
    expect(component.sortOrder()).toBe('ascending');
  });

  it('should sort budgets by name ascending', () => {
    budgetService.budgetDB.set([
      { name: 'Zacarías', totalPrice: 200, date: new Date() } as any,
      { name: 'Albertito', totalPrice: 100, date: new Date() } as any,
    ]);

    component.sortCriteria.set('name');
    component.sortOrder.set('ascending');

    const result = component.sortedBudgets();

    expect(result[0].name).toBe('Albertito');
    expect(result[1].name).toBe('Zacarías');
  });

  it('should sort budgets by price descending', () => {
    budgetService.budgetDB.set([
      { name: 'Budget A', totalPrice: 100, date: new Date() } as any,
      { name: 'Budget B', totalPrice: 500, date: new Date() } as any,
      { name: 'Budget C', totalPrice: 300, date: new Date() } as any,
    ]);

    component.sortCriteria.set('price');
    component.sortOrder.set('descending');

    const result = component.sortedBudgets();

    expect(result[0].totalPrice).toBe(500);
    expect(result[1].totalPrice).toBe(300);
    expect(result[2].totalPrice).toBe(100);
  });

  it('should filter budgets by search term', () => {
    budgetService.budgetDB.set([
      { name: 'Isaac Malagon', totalPrice: 100, date: new Date() } as any,
      { name: 'Albertito Garcia', totalPrice: 200, date: new Date() } as any,
      { name: 'Fernando Alonso', totalPrice: 300, date: new Date() } as any,
    ]);

    component.searchTerm.set('isaac');

    const result = component.sortedBudgets();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Isaac Malagon');
  });

  it('should filter and sort together', () => {
    budgetService.budgetDB.set([
      { name: 'Ana Banana', totalPrice: 500, date: new Date() } as any,
      { name: 'Ana Palangana', totalPrice: 200, date: new Date() } as any,
      { name: 'Zacarías Rodríguez', totalPrice: 300, date: new Date() } as any,
    ]);

    component.searchTerm.set('ana');
    component.sortCriteria.set('price');
    component.sortOrder.set('ascending');

    const result = component.sortedBudgets();

    expect(result.length).toBe(2);
    expect(result[0].totalPrice).toBe(200);
    expect(result[1].totalPrice).toBe(500);
  });

  it('should create budget with correct data structure', () => {
    const spy = vi.spyOn(budgetService, 'addBudget');

    budgetService.selectedServices.set([
      { id: 'seo', name: 'SEO', price: 300, control: 'seo', description: 'SEO service' },
    ]);
    budgetService.currentPages.set(3);
    budgetService.currentLanguages.set(2);

    component.name = 'Test User';
    component.phone = '123456789';
    component.email = 'test@example.com';

    component.submitBudget();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        phone: 123456789,
        pages: 3,
        languages: 2,
        services: expect.arrayContaining([expect.objectContaining({ name: 'SEO' })]),
      }),
    );
  });
});
