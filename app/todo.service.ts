import { Injectable } from "@angular/core";
import {TodoItem} from "./todo.model";

@Injectable()
export class TodoService {
	private todos: TodoItem[] = [];
	private lastId = 0;

	constructor() {
		this.createTodo("Wash your car");
		this.createTodo("Catch a rat", true);
		this.createTodo("Feed my snake");
	}

	createTodo(description: string, isDone = false) {
		this.todos.push({
			id: this.lastId,
			description: description,
			isDone: isDone
		});
		this.lastId++;
	}

	removeTodo(todo: TodoItem) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	}

	getTodo(id: number) {
		return this.todos.find((item: TodoItem) => item.id === id);
	}

	getTodos(): TodoItem[] {
		return this.todos;
	}

}