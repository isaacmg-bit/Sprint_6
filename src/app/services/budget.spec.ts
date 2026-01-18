import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate web extra price automatically', () => {
    service.currentPages.set(3);
    service.currentLanguages.set(2);

    expect(service.webExtra()).toBe(180);
  });

  it('should update webExtra when pages change', () => {
    service.currentPages.set(5);
    service.currentLanguages.set(1);

    expect(service.webExtra()).toBe(150);

    service.currentPages.set(10);
    expect(service.webExtra()).toBe(300);
  });

  it('should reset webExtra to default when reset', () => {
    service.currentPages.set(5);
    service.currentLanguages.set(3);

    expect(service.webExtra()).toBe(450);

    service.resetWebExtra();

    expect(service.currentPages()).toBe(1);
    expect(service.currentLanguages()).toBe(1);
    expect(service.webExtra()).toBe(0);
  });

  it('should calculate total price from selected services and web extra', () => {
    service.selectedServices.set([{ price: 300 } as any, { price: 200 } as any]);

    service.currentPages.set(2);
    service.currentLanguages.set(1);

    expect(service.totalPrice()).toBe(560);
  });

  it('should restore webConfig from query params', () => {
    const params = {
      pages: '2',
      languages: '3',
    };

    service.restoreWebConfig(params as any);

    expect(service.currentPages()).toBe(2);
    expect(service.currentLanguages()).toBe(3);
    expect(service.webExtra()).toBe(180);
  });

  it('should reset web extra when web is unchecked', () => {
    service.currentPages.set(3);
    service.currentLanguages.set(2);

    expect(service.webExtra()).toBe(180);

    service.updateSelectedFromForm({ web: false, seo: false, ads: false } as any, []);

    expect(service.webExtra()).toBe(0);
    expect(service.currentPages()).toBe(1);
    expect(service.currentLanguages()).toBe(1);
  });
});
