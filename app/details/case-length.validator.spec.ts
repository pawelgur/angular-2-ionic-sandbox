import {CaseLengthValidator} from "./case-length.validator";
import {Control} from "@angular/common";

describe("Case Length validator", () => {
	let validator: CaseLengthValidator;
	let control: Control;

	beforeEach(() => {
	    validator = new CaseLengthValidator();
		control = new Control();
	});

	describe("validate", () => {

		describe("given lowercase value", () => {
			it("must return false", () => {
				control.value = "abrab";
				expect(validator.validate(control)).toBe(false);
			});
		});

		describe("given short value", () => {
			it("must return false", () => {
				control.value = "Abr";
				expect(validator.validate(control)).toBe(false);
			});
		});

		describe("given long uppercase value", () => {
			it("must return true", () => {
				control.value = "Abrab";
				expect(validator.validate(control)).toBe(false);
			});
		});

	});
});

