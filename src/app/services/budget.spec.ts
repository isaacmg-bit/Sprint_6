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
});
