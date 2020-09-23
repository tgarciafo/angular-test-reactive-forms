import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const checkEquality: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const name = control.get('name');
    const surname = control.get('surname');

    return name.value !== surname.value ? null : { equals: true };
}