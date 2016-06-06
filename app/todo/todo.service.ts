import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import {TodoItem, AppState} from "./todo.model";
import {TodoClient} from "./todo.client";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

@Injectable()
export class TodoService {
	private lastId = 0;

	private newTodosSource = new Subject<TodoItem>();
	private deletedTodosSource = new Subject<TodoItem>();
	private updatedTodosSource = new Subject<TodoItem>();

	newTodosStream = this.newTodosSource.asObservable();
	deletedTodosStream = this.deletedTodosSource.asObservable();
	updatedTodosStream = this.updatedTodosSource.asObservable();

	constructor(
		private todoClient: TodoClient,
		private store: Store<AppState>
	) {
		// this.store.select("todos").subscribe();
	}

	// currently it constructs objects and puts them to client, how about only listening for actions and persisting to storage?
	// TODO: persisting to storage before actual event? OR "SAVE_TODO", then "TODO_SAVED" - complex problem


}