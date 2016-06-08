import { Injectable } from "@angular/core";
import {TodoItem, AppState} from "./todos.model";
import {TodosClient} from "./todos.client";
import {StateUpdates, Effect} from "@ngrx/effects";
import {TodosActions} from "./todos.actions";
import {Observable} from "rxjs/Rx";

@Injectable()
export class TodosEffects {

	constructor(
		private todoClient: TodosClient,
		private updates: StateUpdates<AppState>
	) {
	}

	@Effect() create = this.updates
		.whenAction(TodosActions.CREATE)
		.map(update => update.action.payload)
		.switchMap((todo: TodoItem) => { // switch original observable with one returned from todoClient.createTodo()
			return this.todoClient.createTodo(todo)
				.map(() => TodosActions.createSuccess(todo))
				.catch((info) => Observable.of({ type: "error", payload: info }));
		});

	// if not footer todos, this could be triggered only on opening list page
	// todo: implement spinner
	@Effect() getList = this.todoClient.getTodos()
		.map((todos: TodoItem[]) => TodosActions.getListSuccess(todos))
		.catch((info) => Observable.of({ type: "error", payload: info }));

	@Effect() update = this.updates
		.whenAction(TodosActions.UPDATE, TodosActions.TOGGLE)
		.map(update => update.action.payload)
		.switchMap((todo: TodoItem) => {
			return this.todoClient.updateTodo(todo)
				.map(() => TodosActions.updateSuccess(todo))
				.catch((info) => Observable.of({ type: "error", payload: info }));
		});

	@Effect() remove = this.updates
		.whenAction(TodosActions.REMOVE)
		.map(update => update.action.payload)
		.switchMap((id: number) => {
			return this.todoClient.deleteTodo(id)
				.map(() => TodosActions.removeSuccess(id))
				.catch((info) => Observable.of({ type: "error", payload: info }));
		});



	// should we use only effects to trigger actions? or put here actions which depend from other actions?
}