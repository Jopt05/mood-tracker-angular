import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  equialsFields(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const p1 = formGroup.get(field1)?.value
        const p2 = formGroup.get(field2)?.value

        if (p1 !== p2) {
            formGroup.get(field2)?.setErrors({ equals: false })
            return { equals: false }
        }
        formGroup.get(field2)?.setErrors(null)
        return null
    }
  }
}
