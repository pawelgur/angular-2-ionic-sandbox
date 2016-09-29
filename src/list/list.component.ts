import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import {TodoItem} from "../todos/todos.model";
import {ActionSheet, NavController} from "ionic-angular";

@Component({
	selector: "todo-list",
	templateUrl: "list.component.html",
	styles: [`
		.done .title,
		.done .description{
			text-decoration: line-through;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush // updates view only when new value is pushed to input
})
export class ListComponent {
	@Input() todos: TodoItem[] = [];

	@Output() toggle = new EventEmitter<TodoItem>();
	@Output() remove = new EventEmitter<number>();
	@Output() edit = new EventEmitter<TodoItem>(); // would use id rather than object if details page would be available from other locations

	constructor(
		private nav: NavController
	){
	}

	showActions(todo: TodoItem) {
		let sheet = ActionSheet.create({
			title: todo.title ? `${todo.description} [${todo.title}]` : todo.description,
			buttons: [
				{
					text: 'Edit',
					handler: () => {
						// not really needed but demonstrates ionic transition chaining
						// let dissmissing = sheet.dismiss();
						// dissmissing.then(() => this.edit.emit(todo));
						return false;
					}
				},
				{
					text: "Delete",
					role: "destructive",
					handler: () => this.remove.emit(todo.id)
				}
			]
		});
		// this.nav.present(sheet);
	}

}