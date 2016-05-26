import { Component } from "@angular/core";
import {TodoService} from "../todo.service";
import {TodoItem} from "../todo.model";
import {CreateComponent} from "./create.component";
import {ActionSheet, NavController} from "ionic-angular";
import {DetailsPage} from "../details/details.page";

@Component({
	selector: "todo-list",
	templateUrl: "build/list/list.component.html",
	directives: [CreateComponent],
	styles: [`
		.done .title,
		.done .description{
			text-decoration: line-through;
		}
	`]
})
export class ListComponent {
	constructor(
		private todoService: TodoService,
		private nav: NavController
	){
	}

	// maybe its better to have a property and update it rather than directly getting from service?
	getTodos(): TodoItem[] {
		return this.todoService.getTodos();
	}

	toggleTodo(todo: TodoItem) {
		this.todoService.setTodoDone(todo, !todo.isDone);
	}

	deleteTodo(todo: TodoItem) {
		this.todoService.removeTodo(todo);
	}

	showActions(todo: TodoItem) {
		let sheet = ActionSheet.create({
			title: todo.title ? `${todo.description} [${todo.title}]` : todo.description,
			buttons: [
				{
					text: 'Edit',
					handler: () => {
						// not really needed but demonstrates transition chaining
						let dissmissing = sheet.dismiss();
						dissmissing.then(() => this.nav.push(DetailsPage, { todo: todo }));
						return false;
					}
				},
				{
					text: "Delete",
					role: "destructive",
					handler: () => this.deleteTodo(todo)
				}
			]
		});
		this.nav.present(sheet);
	}

}