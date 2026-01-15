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
    const price = service.calculateWebExtra(3, 2);
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
