import {Component} from "@angular/core";
import {TodoItem} from "../todo.model";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoService} from "../todo.service";

@Component({
	selector: "latest-done",
	template: `
	<h5>Latest Done ({{ updateTime | date:"short" }}):</h5>
	<todo-preview [todo]="latestDone" *ngIf="latestDone"></todo-preview>
	`,
	directives: [TodoPreviewComponent]
})
export class LatestDoneComponent {
	updateTime: Date = new Date();
	latestDone: TodoItem;

	constructor(
		private todoService: TodoService
	){
		this.latestDone = this.todoService.getTodo(1);
	}

}