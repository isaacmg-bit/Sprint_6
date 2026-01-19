import { Injectable } from '@angular/core';

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateName(name: string): ValidationResult {
    if (!name || name.trim().length < 2) {
      return {
        isValid: false,
        error: 'El nom ha de tenir un mínim de 2 caràcters',
      };
    }

    return { isValid: true, error: '' };
  }

  validateEmail(email: string): ValidationResult {
    if (!email || !email.trim()) {
      return {
        isValid: false,
        error: 'El email és obligatori',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return {
        isValid: false,
        error: 'Email no és vàlid',
      };
    }

    // 3. Todo correcto
    return { isValid: true, error: '' };
  }

  validatePhone(phone: string): ValidationResult {
    if (!phone || phone.trim() === '') {
      return { isValid: false, error: 'El telèfon és obligatori' };
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    if (!/^\d{9}$/.test(cleanPhone)) {
      return {
        isValid: false,
        error: 'El telèfon ha de tenir exactament 9 dígits',
      };
    }

    return { isValid: true, error: '' };
  }
}
