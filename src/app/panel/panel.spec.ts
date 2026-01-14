import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Panel } from './panel';
import { BudgetService } from '../services/budget';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Panel', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel],
      providers: [BudgetService],
    }).compileComponents();

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with MIN_VALUE', () => {
    expect(component.panelForm.get('pages')?.value).toBe(1);
    expect(component.panelForm.get('languages')?.value).toBe(1);
  });

  it('should increment control value', () => {
    component.increment('pages');
    expect(component.panelForm.get('pages')?.value).toBe(2);
  });

  it('should decrement control value but not below MIN_VALUE', () => {
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(1);

    component.panelForm.get('pages')?.setValue(3);
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(2);
  });

  it('should update webExtra on form change', async () => {
    const spy = vi.spyOn(budgetService.webExtra, 'set');

    component.panelForm.patchValue({ pages: 2 });

    expect(spy).toHaveBeenCalled();
  });

  it('should toggle modal', () => {
    expect(component.modalType()).toBeNull();

    component.openModal('pages');
    expect(component.modalType()).toBe('pages');

    component.closeModal();
    expect(component.modalType()).toBeNull();
  });
});
