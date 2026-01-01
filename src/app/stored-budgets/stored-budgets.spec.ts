import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredBudgets } from './stored-budgets';

describe('StoredBudgets', () => {
  let component: StoredBudgets;
  let fixture: ComponentFixture<StoredBudgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoredBudgets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredBudgets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
