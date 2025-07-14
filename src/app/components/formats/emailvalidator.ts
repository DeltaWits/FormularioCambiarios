// email-domain-validator.directive.ts
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailDomainValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailDomainValidatorDirective,
    multi: true
  }]
})
export class EmailDomainValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return null;

    const allowedDomains = ['com', 'co', 'edu', 'org', 'net', 'gov', 'mil'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain || !allowedDomains.some(d => domain.endsWith(`.${d}`))) {
      return { invalidDomain: true };
    }
    
    return null;
  }
}