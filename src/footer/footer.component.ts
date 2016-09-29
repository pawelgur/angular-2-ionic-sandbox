import {Component} from "@angular/core";
import {LatestDoneComponent} from "./latest-done.component";
import {LatestAddedComponent} from "./latest-added.component";
import {Store} from "@ngrx/store";
import {AppState, TodoItem, TodosState} from "../todos/todos.model";
import {TodosService} from "../todos/todos.service";
import {Observable} from "rxjs/Observable";
import {getTodos} from "../todos/todos.reducer";

@Component({
	selector: "todo-footer",
	// directives: [LatestDoneComponent, LatestAddedComponent],
	template: `<ion-toolbar position="bottom">
		<latest-added [todo]="latestCreatedTodo | async"></latest-added>
		<latest-done [todo]="latestDoneTodo | async"></latest-done>
	</ion-toolbar>`
})
export class FooterComponent {
	latestCreatedTodo: Observable<TodoItem>;
	latestDoneTodo: Observable<TodoItem>;

	constructor(
		private store: Store<AppState>,
		private todoHelper: TodosService
	){
		this.latestCreatedTodo = this.store
			.let(getTodos())
			.map((todos: TodoItem[]) => {
				return this.todoHelper.getLatestAdded(todos);
			})
			.distinctUntilChanged(); // don't emit if latest added didn't change (otherwise it would update on each change to "todos")
		this.latestDoneTodo = this.store
			.let(getTodos())
			.map((todos: TodoItem[]) => {
				return this.todoHelper.getLatestDone(todos);
			})
			.distinctUntilChanged();
		// let() operator should be used if we would like to inject map() or any other operators without modifying this source
		// "latestCreatedTodo" selectors might be extracted, but they will not be reused anywhere else at the moment
	}



}