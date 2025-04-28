import { IValidationErrorMessage } from 'form-runner';


export type AbstractControl<T> = {
  path: string,
  value: T,
  parent: any
};

export interface ValidationResult {
  key: string,
  value: string
}

export interface ValidatorFunction<T> {
  (control: AbstractControl<T>): ValidationResult | null;
}

export function requiredValidator<T>(): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (control.value !== 0 && !control.value) {
      return { key: control.path, value: "required" };
    }
    return null;
  }
}

export function patternValidator<T extends string>(pattern: string): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || RegExp(pattern).test(control.value)) {
      return { key: control.path, value: "pattern" };
    }
    return null;
  }
}

export function minValidator<T extends number>(min: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || control.value < min) {
      return { key: control.path, value: "min" };
    }
    return null;
  }
}

export function maxValidator<T extends number>(max: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || control.value > max) {
      return { key: control.path, value: "max" };
    }
    return null;
  }
}

export function minLengthValidator<T extends string>(minLength: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || control.value.length < minLength) {
      return { key: control.path, value: "minlength" };
    }
    return null;
  }
}

export function maxLengthValidator<T extends string>(maxLength: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || control.value.length > maxLength) {
      return { key: control.path, value: "maxlength" };
    }
    return null;
  }
}

export function rangeNumberValidator<T extends number>(min: number, max: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || (control.value < min || control.value > max)) {
      return { key: control.path, value: "numberrange" };
    }
    return null;
  }
}

export function rangeLengthValidator<T extends string>(minLength: number, maxLength: number): ValidatorFunction<T> {
  return (control: AbstractControl<T>): ValidationResult | null => {
    if (!control.value || (control.value.length < minLength || control.value.length > maxLength)) {
      return { key: control.path, value: "lengthrange" };
    }
    return null;
  }
}
