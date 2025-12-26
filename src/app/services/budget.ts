import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Budget {
  webExtra = signal<number>(0);

  private readonly PRICE_PER_UNIT = 30;

  calculateWebExtra(pages: number, languages: number): number {
    return pages * languages * this.PRICE_PER_UNIT;
  }

  resetWebExtra() {
    this.webExtra.set(0);
  }
}
