import { Component } from "@angular/core";
import { Router, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import {TodoService} from "../todo.service";
import {TodoItem} from "../todo.model";
import {CaseLengthValidator} from "./case-length.validator";
import {ValidationMessageComponent} from "./validation-message.component";

@Component({
	selector: "todo-details",
	templateUrl: "app/details/details.component.html",
	directives: [ROUTER_DIRECTIVES, CaseLengthValidator, ValidationMessageComponent]
})
export class DetailsComponent {
	todo: TodoItem;

	constructor(
		private todoService: TodoService,
		private routeParams: RouteParams,
		private router: Router
	){
	}

	ngOnInit() {
		let id = +this.routeParams.get("id");
		this.todo = Object.assign({}, this.todoService.getTodo(id)); // clone as we don't want to change props without submiting form
	}

	onSave() {
		Object.assign(this.todoService.getTodo(this.todo.id), this.todo);
		this.router.navigate(["List"]);
	}

	click(tit: any) {
		console.log(typeof tit);
		console.log(tit);
	}
}