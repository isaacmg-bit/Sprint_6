import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsList } from './budgets-list';

describe('BudgetsList', () => {
  let component: BudgetsList;
  let fixture: ComponentFixture<BudgetsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsList]
    })
    .compileComponents();

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
});
