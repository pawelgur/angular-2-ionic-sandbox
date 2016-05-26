import {ViewChild} from "@angular/core";
import {NgControlName} from "@angular/common";
import {TodoService} from "../todo.service";
import {TodoItem} from "../todo.model";
import {CaseLengthValidator} from "./case-length.validator";
import {Page, NavParams, NavController} from "ionic-angular";
import {ValidationMessageComponent} from "./validation-message.component";

@Page({
	templateUrl: "build/details/details.page.html",
	directives: [CaseLengthValidator, ValidationMessageComponent]
})
export class DetailsPage {
	todo: TodoItem;

	@ViewChild("title") titleControl: NgControlName;

	constructor(
		private todoService: TodoService,
		private navParams: NavParams,
		private nav: NavController
	){
		this.todo = Object.assign({}, this.navParams.get("todo")); // clone as we don't want to change props without submiting form
	}

	onSave() {
		Object.assign(this.todoService.getTodo(this.todo.id), this.todo);
		this.goBack();
	}

	goBack() {
		// for some reason pop doesn't update z-index - overlaps list page (looks like ionic bug)
		this.nav.remove();
	}


	// trying to implement debounce on model update and validation triggers, not succesful
	// ngAfterViewChecked() {
	// 	// titleControl.control is available here (not yet available afterViewInit)
	// 	if (!this.addedHandlers && this.titleControl.control) {
	// 		this.titleControl.control.valueChanges
	// 			// .debounceTime(400) // for some damn reason it doesn't have this method
	// 			.subscribe((title) => {
	// 				console.log("updating title debounced:", title);
	// 				this.todo.title = title;
	// 			});
	// 		this.addedHandlers = true;
	// 	}
	// }

}