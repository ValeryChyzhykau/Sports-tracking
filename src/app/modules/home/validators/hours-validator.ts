import { FormGroup } from '@angular/forms';

export function validationHours(
  controlTo: string,
  controlFrom: string
): (formGroup: FormGroup) => void {
  return (formGroup: FormGroup): void => {
    const control = formGroup.controls[controlTo];
    const matchingControl = formGroup.controls[controlFrom];
    if (control.value <= matchingControl.value) {
      control.setErrors({ mustMatch: true });
    } else {
      control.setErrors(null);
    }
  };
}
