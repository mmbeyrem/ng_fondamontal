import { Directive } from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: "[LocationValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LocationValidatorDirective,
      multi: true,
    },
  ],
})
export class LocationValidatorDirective implements Validator {
  constructor() {}
  validate(formGroup: FormGroup): import("@angular/forms").ValidationErrors {
    debugger;
    const addressCtr = formGroup.controls.address;
    const cityCtr = formGroup.controls.city;
    const countryCtr = formGroup.controls.country;
    const onlineUrl = formGroup.parent.controls["onlineUrl"];
    if (
      (addressCtr &&
        addressCtr.value &&
        cityCtr &&
        cityCtr.value &&
        countryCtr &&
        countryCtr.value) ||
      (onlineUrl &&
        onlineUrl.value &&
        (<string>onlineUrl.value).startsWith("http"))
    )
      return null;
    return { LocationValidatorDirective: false };
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
