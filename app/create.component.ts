import { Component } from "@angular/core";
import {TodoService} from "./todo.service";

@Component({
	selector: "todo-create",
	template: `
	<h2>Create todo:</h2>
	<form (submit)="onCreate()">
		<label for="todo-description">Description:</label><input id="todo-description" type="text" [(ngModel)]="description"  />
		<input type="submit" value="Create" />
	</form>
	`
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