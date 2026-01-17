import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UrlService } from './url-service';
import { BudgetService } from './budget';
import { vi } from 'vitest';

describe('UrlService', () => {
  let service: UrlService;
  let router: Router;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlService,
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
        BudgetService,
      ],
    });

    service = TestBed.inject(UrlService);
    router = TestBed.inject(Router);
    budgetService = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear query params when no services are selected', () => {
    service.updateURL({ seo: false, ads: false, web: false } as any);

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: {},
      replaceUrl: true,
    });
  });

  it('should set seo and ads query params', () => {
    service.updateURL({ seo: true, ads: true, web: false } as any);

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: {
        seo: 'true',
        ads: 'true',
      },
      replaceUrl: true,
    });
  });

  it('should include pages and languages when web is selected', () => {
    budgetService.currentPages.set(2);
    budgetService.currentLanguages.set(3);

    service.updateURL({ seo: false, ads: false, web: true } as any);

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: {
        web: 'true',
        pages: '2',
        languages: '3',
      },
      replaceUrl: true,
    });
  });
});
