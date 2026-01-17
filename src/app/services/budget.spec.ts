import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget';

describe('Budget', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate web extra price correctly', () => {
    service.currentPages.set(3);
    service.currentLanguages.set(2);

    const price = service.calculateWebExtra();

    expect(price).toBe(180);
  });

  it('should initialize webExtra signal at 0', () => {
    expect(service.webExtra()).toBe(0);
  });

  it('should reset webExtra to 0', () => {
    service.webExtra.set(500);
    service.resetWebExtra();
    expect(service.webExtra()).toBe(0);
  });

  it('should calculate total price from selected services and web extra', () => {
    service.selectedServices.set([{ price: 300 } as any, { price: 200 } as any]);

    service.webExtra.set(60);

    expect(service.totalPrice()).toBe(560);
  });
  it('should initialize selected services and webExtra from query params', () => {
    const budgets = [{ control: 'seo', price: 300 } as any, { control: 'web', price: 500 } as any];

    const params = {
      seo: 'true',
      web: 'true',
      pages: '2',
      languages: '1',
    };

    const result = service.initializeFromQueryParams(params as any, budgets);

    expect(result.length).toBe(2);
    expect(service.selectedServices().length).toBe(2);
    expect(service.currentPages()).toBe(2);
    expect(service.currentLanguages()).toBe(1);
    expect(service.webExtra()).toBe(60);
  });

  it('should reset web extra when web is unchecked', () => {
    service.webExtra.set(120);
    service.currentPages.set(3);
    service.currentLanguages.set(2);

    service.updateSelectedFromForm({ web: false, seo: false, ads: false } as any, []);

    expect(service.webExtra()).toBe(0);
    expect(service.currentPages()).toBe(1);
    expect(service.currentLanguages()).toBe(1);
  });
});
