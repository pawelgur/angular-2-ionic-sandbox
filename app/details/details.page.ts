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
		this.todo = this.navParams.get("todo");
	}

	onSave() {
		this.todoService.saveTodo(this.todo).subscribe(() => this.goBack());
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
	// 			// .debounceTime(400) // for some damn reason it doesn't have this method // UPDATE: rxjs operator not imported
	// 			.subscribe((title) => {
	// 				console.log("updating title debounced:", title);
	// 				this.todo.title = title;
	// 			});
	// 		this.addedHandlers = true;
	// 	}
	// }

}