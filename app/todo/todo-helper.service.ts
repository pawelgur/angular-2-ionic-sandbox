import {Injectable} from "@angular/core";
import {TodoItem} from "./todo.model";

@Injectable()
export class TodoHelperService {
	lastId = 0;

	createTodo(description: string, isDone = false): TodoItem {
		let todo: TodoItem = {
			id: this.lastId + 1,
			description: description,
			isDone: isDone,
			updateDate: new Date(),
			createDate: new Date()
		};
		this.lastId++;

		// we will have full state (including todos) on client, try to implement this to work with
		// traditional rest API
		// should whole state be saved or only data?

		return todo;
	}
	getLatestDone(todos: TodoItem[]): TodoItem {
		return [...todos]
			.sort(this.todoUpdateComparator("updateDate"))
			.reverse()
			.find((todo: TodoItem) => todo.isDone);
	}

	getLatestAdded(todos: TodoItem[]): TodoItem {
		return [...todos]
			.sort(this.todoUpdateComparator("createDate"))
			.pop();
	}

	todoUpdateComparator(propertyKey: string) {
		return (a: TodoItem, b: TodoItem) => {
			if (a[propertyKey] < b[propertyKey]) {
				return -1;
			}
			if (a[propertyKey] > b[propertyKey]) {
				return 1;
			}
			return 0;
		};
	}

}