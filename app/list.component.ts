import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import {TodoService} from "./todo.service";
import {TodoItem} from "./todo.model";
import {CreateComponent} from "./create.component";

@Component({
	selector: "todo-list",
	templateUrl: "/app/list.component.html",
	directives: [CreateComponent, ROUTER_DIRECTIVES],
	styles: [`
		.done .title,
		.done .description{
			text-decoration: line-through;
		}
	`]
})
export class ListComponent {

	constructor(
		private todoService: TodoService
	){
	}

	// maybe its better to have a property and update it rather than directly getting from service?
	getTodos(): TodoItem[] {
		return this.todoService.getTodos();
	}

	toggleTodo(todo: TodoItem) {
		todo.isDone = !todo.isDone;
	}

	deleteTodo(todo: TodoItem) {
		this.todoService.removeTodo(todo);
	}

}