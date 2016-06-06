import { Component, Output, EventEmitter } from "@angular/core";
import {TodoItem} from "../todo/todo.model";
import {TodoHelperService} from "../todo/todo-helper.service";

@Component({
	selector: "todo-create",
	templateUrl: "build/list/create.component.html"
})
export class CreateComponent {
	description: string;

	@Output() create = new EventEmitter<TodoItem>();

	constructor(
		private todoHelper: TodoHelperService
	){
	}

	onCreate() {
		this.create.emit(this.todoHelper.createTodo(this.description));
		this.description = "";
	}
}