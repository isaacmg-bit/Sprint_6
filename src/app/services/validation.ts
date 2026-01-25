import { Injectable } from '@angular/core';

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly PHONE_REGEX = /^\d{9}$/;
  private readonly PHONE_CLEAN_REGEX = /[\s\-()]/g;
  readonly NAME_ERROR_MINCHARS = 'El nom ha de tenir un mínim de 2 caràcters';
  readonly EMAIL_ERROR_MANDATORY = 'El email és obligatori';
  readonly EMAIL_ERROR_NOTVALID = 'El email no és vàlid';
  readonly PHONE_ERROR_MANDATORY = 'El telèfon és obligatori';
  readonly PHONE_ERROR_MAXDIGITS = 'El telèfon ha de tenir exactament 9 dígits';

  validateName(name: string): ValidationResult {
    if (!name || name.trim().length < 2) {
      return {
        isValid: false,
        error: this.NAME_ERROR_MINCHARS,
      };
    }

    return { isValid: true, error: '' };
  }

  validateEmail(email: string): ValidationResult {
    if (!email || !email.trim()) {
      return {
        isValid: false,
        error: this.EMAIL_ERROR_MANDATORY,
      };
    }

    if (!this.EMAIL_REGEX.test(email.trim())) {
      return {
        isValid: false,
        error: this.EMAIL_ERROR_NOTVALID,
      };
    }

    return { isValid: true, error: '' };
  }

  validatePhone(phone: string): ValidationResult {
    if (!phone || phone.trim() === '') {
      return { isValid: false, error: this.PHONE_ERROR_MANDATORY };
    }

    const cleanPhone = phone.replace(this.PHONE_CLEAN_REGEX, '');

    if (!this.PHONE_REGEX.test(cleanPhone)) {
      return {
        isValid: false,
        error: this.PHONE_ERROR_MAXDIGITS,
      };
    }

    return { isValid: true, error: '' };
  }
}
