import {TodoItem, AppState, ACTIONS} from "../todo/todo.model";
import {CaseLengthValidator} from "./case-length.validator";
import {Page, NavParams, NavController} from "ionic-angular";
import {ValidationMessageComponent} from "./validation-message.component";
import {Store} from "@ngrx/store";

@Page({
	templateUrl: "build/details/details.page.html",
	directives: [CaseLengthValidator, ValidationMessageComponent]
})
export class DetailsPage {
	todo: TodoItem;

	constructor(
		private navParams: NavParams,
		private nav: NavController,
		private store: Store<AppState>
	){
		this.todo = Object.assign({}, this.navParams.get("todo")); // clone so we won't change state before saving
	}

	onSave() {
		this.store.dispatch({
			type: ACTIONS.TODOS.UPDATE,
			payload: this.todo
		});
		this.goBack();
	}

	goBack() {
		// for some reason pop doesn't update z-index - overlaps list page (looks like ionic bug)
		this.nav.remove();
	}


	// trying to implement debounce on model update and validation triggers, not succesful
	// @ViewChild("title") titleControl: NgControlName;
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