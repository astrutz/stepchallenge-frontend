import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordEqualValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return (password?.value ?? -1 !== confirmPassword?.value ?? -2)
    ? { passwordUnequal: true }
    : null;
};
