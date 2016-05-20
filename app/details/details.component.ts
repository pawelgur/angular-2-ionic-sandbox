import { Component } from "@angular/core";
import { RouteParams } from '@angular/router-deprecated';
import {TodoService} from "../todo.service";
import {TodoItem} from "../todo.model";

@Component({
	selector: "todo-details",
	templateUrl: "app/details/details.component.html"
})
export class DetailsComponent {
	todo: TodoItem;

	constructor(
		private todoService: TodoService,
		private routeParams: RouteParams
	){
	}

	ngOnInit() {
		let id = +this.routeParams.get("id");
		this.todo = this.todoService.getTodo(id);
	}
}