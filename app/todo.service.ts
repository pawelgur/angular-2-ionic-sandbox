import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import {TodoItem} from "./todo.model";
import {TodoClient} from "./todo.client";
import {Observable} from "rxjs/Observable";

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
		private todoClient: TodoClient
	) {}

	createTodo(description: string, isDone = false): Observable<any> {
		let todo: TodoItem = {
			id: this.lastId + 1,
			description: description,
			isDone: isDone,
			updateDate: new Date(),
			createDate: new Date()
		};

		// NOTE: http streams are closed when response is received, no need to keep track of subscriptions and unsubscribe
		let creating = this.todoClient.createTodo(todo);
		creating.subscribe(() => {
			this.lastId = todo.id;
			this.newTodosSource.next(todo);
		});

		return creating;
	}

	removeTodo(todo: TodoItem): Observable<any> {
		let deleting = this.todoClient.deleteTodo(todo.id);
		deleting.subscribe(() => this.deletedTodosSource.next(todo));

		return deleting;
	}

	getTodo(id: number): Observable<TodoItem> {
		return this.todoClient.getTodo(id);
	}

	getTodos(): Observable<TodoItem[]> {
		let gettingTodos = this.todoClient.getTodos();

		// todo: caching, update it on any update

		// ugly solution, but id would be generated on server in real app
		gettingTodos.subscribe((todos: TodoItem[]) => {
			console.log("running getTodos subscribe");
			if (todos.length) {
				this.lastId = todos[todos.length - 1].id;
			}
		});

		return gettingTodos;
	}

	saveTodo(todo: TodoItem): Observable<any> {
		todo.updateDate = new Date();

		let updating = this.todoClient.updateTodo(todo);
		updating.subscribe(() => {
			this.updatedTodosSource.next(todo);
		});

		return updating;
	}

	setDone(todo: TodoItem, isDone = true) {
		todo.isDone = isDone;
		this.saveTodo(todo);
	}

	// decided to add updateDate and getLatest... method instead of using Subject buffer, because latter
	// is not 100% error prone unless using big buffer which might affect performance
	// e.g. having buffer size 5, when five new message will be pushed we'll loose last done item
	getLatestDone(): Observable<TodoItem> {
		return this.getTodos()
			.map((todos: TodoItem[]) => {
				return todos
					.sort(this.todoUpdateComparator)
					.reverse()
					.find((todo: TodoItem) => todo.isDone);
			});
	}

	getLatestAdded(): Observable<TodoItem> {
		return this.getTodos()
			.map((todos: TodoItem[]) => {
				if (todos.length) {
					return todos[todos.length - 1];
				}
				return null;
			});
	}

	todoUpdateComparator(a: TodoItem, b: TodoItem): number {
		if (a.updateDate < b.updateDate) {
			return -1;
		}
		if (a.updateDate > b.updateDate) {
			return 1;
		}
		return 0;
	}

}