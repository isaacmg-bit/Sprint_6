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

  it('should initialize form with MIN_VALUE (1)', () => {
    expect(component.panelForm.get('pages')?.value).toBe(1);
    expect(component.panelForm.get('languages')?.value).toBe(1);
  });

  it('should increment pages and update service', () => {
    component.increment('pages');

    expect(component.panelForm.get('pages')?.value).toBe(2);
    expect(budgetService.currentPages()).toBe(2);
  });

  it('should decrement pages but not below 1', () => {
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(1);

    component.panelForm.get('pages')?.setValue(3);
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(2);
    expect(budgetService.currentPages()).toBe(2);
  });

  it('should update webExtra automatically when pages change', () => {
    budgetService.currentLanguages.set(2);

    component.increment('pages');

    expect(budgetService.webExtra()).toBe(60);
  });

  it('should emit valuesChanged event when value changes', () => {
    const spy = vi.fn();
    component.valuesChanged.subscribe(spy);

    component.increment('pages');

    expect(spy).toHaveBeenCalled();
  });

  it('should open and close modal', () => {
    expect(component.modalType()).toBeNull();

    component.openModal('pages');
    expect(component.modalType()).toBe('pages');

    component.closeModal();
    expect(component.modalType()).toBeNull();
  });

  it('should update both pages and languages independently', () => {
    component.increment('pages');
    component.increment('pages');
    expect(budgetService.currentPages()).toBe(3);

    component.increment('languages');
    expect(budgetService.currentLanguages()).toBe(2);

    expect(budgetService.webExtra()).toBe(180);
  });
});
