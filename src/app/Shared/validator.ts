import { AbstractControl, ValidationErrors } from '@angular/forms';

export function pinValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value && control.value.toString().length !== 6) {
    return { length: 'INVALID LENGTH' };
  }
  return null;
}

export function ageValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value.toString() && control.value <= 0) {
    return { age: 'Age Must be Greater Than 0' };
  }
  return null;
}
