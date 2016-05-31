import {Component, OnDestroy} from "@angular/core";
import {TodoItem} from "../todo.model";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs/Subscription";
import {NavController} from "ionic-angular/index";

@Component({
	selector: "latest-added",
	template: `
	<ion-icon name="add-circle" secondary medium></ion-icon>
	<ion-badge>{{ latestTodo?.createDate | date:"HHmmss" }}</ion-badge>
	<todo-preview [todo]="latestTodo" *ngIf="latestTodo"></todo-preview>
	`,
	directives: [TodoPreviewComponent]
})
export class LatestAddedComponent implements OnDestroy {
	latestTodo: TodoItem;
	subscription = new Subscription();

	constructor(
		private todoService: TodoService
	){
		this.updateLatest();

		this.subscription
			.add(
				this.todoService.newTodosStream.subscribe((todo: TodoItem) => {
					this.latestTodo = todo;
				})
			).add(
				this.todoService.deletedTodosStream.subscribe((todo: TodoItem) => {
					if (this.latestTodo && this.latestTodo.id === todo.id) {
						this.updateLatest();
					}
				})
			);
	}

	ngOnDestroy(): any {
		this.subscription.unsubscribe();
	}

	updateLatest() {
		this.todoService.getLatestAdded()
			.subscribe((todo: TodoItem) => {
				this.latestTodo = todo;
			});
	}
}