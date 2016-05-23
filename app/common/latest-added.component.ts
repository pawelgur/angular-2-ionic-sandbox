import {Component, OnDestroy} from "@angular/core";
import {TodoItem} from "../todo.model";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs/Subscription";

@Component({
	selector: "latest-added",
	template: `
	<h5>Latest added ({{ updateTime | date:"short" }}):</h5>
	<todo-preview [todo]="latestTodo" *ngIf="latestTodo"></todo-preview>
	`,
	directives: [TodoPreviewComponent]
})
export class LatestAddedComponent implements OnDestroy {
	updateTime: Date = new Date();
	_latestTodo: TodoItem;
	subscription = new Subscription();

	constructor(
		private todoService: TodoService
	){
		this.latestTodo = todoService.getLatestAdded();

		this.subscription
			.add(
				this.todoService.newTodosStream.subscribe((todo: TodoItem) => {
					this.latestTodo = todo;
				})
			).add(
				this.todoService.deletedTodosStream.subscribe((todo: TodoItem) => {
					if (this.latestTodo === todo) {
						this.latestTodo = this.todoService.getLatestAdded();
					}
				})
			);
	}

	set latestTodo(todo: TodoItem) {
		this.updateTime = new Date();
		this._latestTodo = todo;
	}

	get latestTodo() {
		return this._latestTodo;
	}

	ngOnDestroy(): any {
		this.subscription.unsubscribe();
	}
}