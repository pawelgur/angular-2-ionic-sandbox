import {Component, Input} from "@angular/core";

@Component({
	selector: "validation-message",
	template: `<div *ngFor="let error of errorsList" class="help-block">
		<ion-icon name="warning"></ion-icon>{{error}}
	</div>`
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