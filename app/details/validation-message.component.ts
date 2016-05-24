import {Component, Input, OnInit} from "@angular/core";

@Component({
	selector: "validation-message",
	template: `<span *ngFor="let error of errorsList" class="help-block">{{error}}</span>`
})
export class ValidationMessageComponent {
	errorsList: string[];

	@Input()set errors(errors: any) {
		this.errorsList = [];

		if (!errors) {
			return;
		}

		// shitty implementation
		if (errors.caseLength) {
			this.errorsList.push(errors.caseLength.text);
		}
	}
}