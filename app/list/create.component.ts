import { Component } from "@angular/core";
import {TodoService} from "../todo.service";

@Component({
	selector: "todo-create",
	templateUrl: "build/list/create.component.html"
})
export class CreateComponent {
	description: string;

	constructor(
		private todoService: TodoService
	){
	}

	onCreate() {
		if (this.description) {
			this.todoService.createTodo(this.description);
		}
		this.description = "";
	}
}