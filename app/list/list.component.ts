import { Component, OnInit, OnDestroy } from "@angular/core";
import {TodoService} from "../todo.service";
import {TodoItem} from "../todo.model";
import {CreateComponent} from "./create.component";
import {ActionSheet, NavController} from "ionic-angular";
import {DetailsPage} from "../details/details.page";
import {Subscription} from "rxjs/Subscription";

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
export class ListComponent implements OnInit, OnDestroy {
	todos: TodoItem[] = [];
	supscriptions = new Subscription();

	constructor(
		private todoService: TodoService,
		private nav: NavController
	){

	}

	ngOnInit() {
		this.todoService
			.getTodos()
			.subscribe((todos: TodoItem[]) => this.todos = todos);

		this.supscriptions
			.add(
				this.todoService.newTodosStream
					.subscribe((todo: TodoItem) => this.todos.push(todo))
			).add(
				this.todoService.deletedTodosStream
					.subscribe((todo: TodoItem) => {
						console.log("removing");
						this.todos = this.todos.filter((item: TodoItem) => item.id !== todo.id);
					})
			);
	}

	toggleTodo(todo: TodoItem) {
		this.todoService.setDone(todo, !todo.isDone);
	}

	deleteTodo(todo: TodoItem) {
		return this.todoService.removeTodo(todo);
	}

	showActions(todo: TodoItem) {
		let sheet = ActionSheet.create({
			title: todo.title ? `${todo.description} [${todo.title}]` : todo.description,
			buttons: [
				{
					text: 'Edit',
					handler: () => {
						// not really needed but demonstrates ionic transition chaining
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

	ngOnDestroy() {
		this.supscriptions.unsubscribe();
	}

}