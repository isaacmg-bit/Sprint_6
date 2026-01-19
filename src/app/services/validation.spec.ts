import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false and first error message if email is empty', () => {
    const result = service.validateEmail('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El email és obligatori');
  });

  it('should return false and second error message if email is incorrect', () => {
    const result = service.validateEmail('test@t.');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El email no és vàlid');
  });

  it('should return true if email is valid', () => {
    const result = service.validateEmail('test@test.com');
    expect(result.isValid).toBe(true);
    expect(result.error).toBe('');
  });

  it('should return false if name is empty', () => {
    const result = service.validateName('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El nom ha de tenir un mínim de 2 caràcters');
  });

  it('should return false if name has only 1 character', () => {
    const result = service.validateName('A');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El nom ha de tenir un mínim de 2 caràcters');
  });

  it('should return true if name has 2 characters', () => {
    const result = service.validateName('Ab');
    expect(result.isValid).toBe(true);
    expect(result.error).toBe('');
  });

  it('should return false if phone is empty', () => {
    const result = service.validatePhone('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El telèfon és obligatori');
  });

  it('should return false if phone has less than 9 digits', () => {
    const result = service.validatePhone('12345678');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El telèfon ha de tenir exactament 9 dígits');
  });

  it('should return false if phone has more than 9 digits', () => {
    const result = service.validatePhone('1234567890');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El telèfon ha de tenir exactament 9 dígits');
  });

  it('should return false if phone contains letters', () => {
    const result = service.validatePhone('12345678a');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('El telèfon ha de tenir exactament 9 dígits');
  });

  it('should return true if phone has exactly 9 digits', () => {
    const result = service.validatePhone('123456789');
    expect(result.isValid).toBe(true);
    expect(result.error).toBe('');
  });
});
