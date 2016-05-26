import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import {TodoItem} from "./todo.model";

@Injectable()
export class TodoService {
	private todos: TodoItem[] = [];
	private lastId = 0;

	private newTodosSource = new Subject<TodoItem>();
	private deletedTodosSource = new Subject<TodoItem>();
	private updatedTodosSource = new Subject<TodoItem>();

	newTodosStream = this.newTodosSource.asObservable();
	deletedTodosStream = this.deletedTodosSource.asObservable();
	updatedTodosStream = this.updatedTodosSource.asObservable();

	constructor() {
		this.createTodo("Wash your car");
		this.createTodo("Catch a rat", true);
		this.createTodo("Feed my snake");
	}

	createTodo(description: string, isDone = false) {
		let todo: TodoItem = {
			id: this.lastId,
			description: description,
			isDone: isDone,
			updateDate: new Date(),
			createDate: new Date()
		};

		this.todos.push(todo);
		this.lastId++;

		this.newTodosSource.next(todo);
	}

	removeTodo(todo: TodoItem) {
		this.todos.splice(this.todos.indexOf(todo), 1);

		this.deletedTodosSource.next(todo);
	}

	getTodo(id: number) {
		return this.todos.find((item: TodoItem) => item.id === id);
	}

	getTodos(): TodoItem[] {
		return this.todos;
	}

	setTodoDone(todo: TodoItem, isDone = true) {
		todo.isDone = isDone;
		todo.updateDate = new Date();

		this.updatedTodosSource.next(todo);
	}

	// decided to add updateDate and getLatest... method instead of using Subject buffer, because latter
	// is not 100% error prone unless using big buffer which might affect performance
	// e.g. having buffer size 5, when five new message will be pushed we'll loose last done item
	getLatestDone(): TodoItem {
		return this.todos
			.slice()
			.sort((a: TodoItem, b: TodoItem) => {
				if (a.updateDate < b.updateDate) {
					return -1;
				}
				if (a.updateDate > b.updateDate) {
					return 1;
				}
				return 0;
			})
			.reverse()
			.find((todo: TodoItem) => todo.isDone);
	}

	getLatestAdded(): TodoItem {
		return this.todos[this.todos.length - 1];
	}


}