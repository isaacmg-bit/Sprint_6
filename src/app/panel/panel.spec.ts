import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Budget } from '../services/budget';
import { Panel } from './panel';

describe('Panel', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;
  let budgetService: Budget;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel],
      providers: [Budget],
    }).compileComponents();

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(Budget);
    await fixture.whenStable();
  });

  it('should create the panel component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize panelForm with minimum values', () => {
    expect(component.panelForm.value).toEqual({
      pages: 1,
      languages: 1,
    });
  });

  it('should increment a value', () => {
    component.increment('pages');
    expect(component.panelForm.get('pages')?.value).toBe(2);
  });

  it('should decrement a value', () => {
    component.increment('pages');
    expect(component.panelForm.get('pages')?.value).toBe(2);
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(1);
  });

  it('should not decrement below minimum value', () => {
    component.decrement('pages');
    expect(component.panelForm.get('pages')?.value).toBe(1);
  });

  it('should open and close modal', () => {
    component.openModal('pages');
    expect(component.modalType).toBe('pages');

    component.closeModal();
    expect(component.modalType).toBeNull();
  });

  it('should call calculateWebExtra when form changes', () => {
    const spy = vi.spyOn(budgetService, 'calculateWebExtra');
    component.panelForm.patchValue({ pages: 3, languages: 2 });
    expect(spy).toHaveBeenCalledWith(3, 2);
  });
});
