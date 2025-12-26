import { Injectable } from '@angular/core';
import { Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Budget {


  private readonly PRICE_PER_UNIT = 30;

  calculateWeb(pages: number, languages: number): number {
    return pages * languages * this.PRICE_PER_UNIT;
  }
}
