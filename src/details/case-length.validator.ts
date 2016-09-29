import {Directive, forwardRef } from "@angular/core";
// import {Control, NG_VALIDATORS} from "@angular/common";

@Directive({
	selector: "[ngControl][validate-case-length]",
	providers: [
		// {
		// 	provide: NG_VALIDATORS,
		// 	useExisting: forwardRef(() => CaseLengthValidator),
		// 	multi: true
		// }
	]
})
export class CaseLengthValidator {
	// for test purposes, otherwise might be implemented with builtin pattern validator
	validate(/*control: Control*/) {
		// if (!control.value) {
		// 	return null;
		// }
		//
		// let isValid = control.value.length > 3 && control.value[0] === control.value[0].toUpperCase();
		//
		// return isValid ? null : {
		// 	caseLength: {
		// 		valid: false,
		// 		text: "Must start with uppercase letter and be longer than 3 chars"
		// 	}
		// };
	}
}