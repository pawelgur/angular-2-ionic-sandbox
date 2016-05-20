import {Component} from "@angular/core";
import {TodoItem} from "../todo.model";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoService} from "../todo.service";

@Component({
	selector: "latest-added",
	template: `
	<h5>Latest added ({{ updateTime | date:"short" }}):</h5>
	<todo-preview [todo]="latestTodo" *ngIf="latestTodo"></todo-preview>
	`,
	directives: [TodoPreviewComponent]
})
export class LatestAddedComponent {
	updateTime: Date = new Date();
	latestTodo: TodoItem;

	constructor(
		private todoService: TodoService
	){
		this.latestTodo = this.todoService.getTodo(2);
	}

}