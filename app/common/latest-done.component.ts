import {Component, OnDestroy} from "@angular/core";
import {TodoItem} from "../todo.model";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs/Subscription";

@Component({
	selector: "latest-done",
	template: `
	<h5>Latest Done ({{ updateTime | date:"short" }}):</h5>
	<todo-preview [todo]="latestDone" *ngIf="latestDone"></todo-preview>
	`,
	directives: [TodoPreviewComponent]
})
export class LatestDoneComponent implements OnDestroy {
	updateTime: Date = new Date();
	_latestDone: TodoItem;
	subscription = new Subscription();

	constructor(
		private todoService: TodoService
	){
		this.latestDone = this.todoService.getLatestDone();

		this.subscription
			.add(this.todoService.newTodosStream.subscribe(this.onTodoCreate.bind(this)))
			.add(this.todoService.updatedTodosStream.subscribe(this.onTodoUpdate.bind(this)))
			.add(this.todoService.deletedTodosStream.subscribe(this.onTodoDelete.bind(this)));
	}

	onTodoCreate(todo: TodoItem) {
		if (todo.isDone) {
			this.latestDone = todo;
		}
	}

	onTodoUpdate(todo: TodoItem): void {
		if (todo.isDone) {
			this.latestDone = todo;
		} else if (this.latestDone === todo) {
			this.latestDone = this.todoService.getLatestDone();
		}
	}

	onTodoDelete(todo: TodoItem): void {
		if (this.latestDone === todo) {
			this.latestDone = this.todoService.getLatestDone();
		}
	}

	set latestDone(todo: TodoItem) {
		this.updateTime = new Date();
		this._latestDone = todo;
	}

	get latestDone() {
		return this._latestDone;
	}

	ngOnDestroy(): any {
		this.subscription.unsubscribe();
	}

}