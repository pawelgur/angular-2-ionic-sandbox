import {Injectable} from "@angular/core";
import {TodoItem, AppState, TodosState} from "./todos.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Rx";

@Injectable()
export class TodosService {
	lastId = 0;
	subscription: Subscription;

	constructor(
		private store: Store<AppState>
	) {
		this.subscription = this.store.select("todos")
			.map((state: TodosState) => state.lastId)
			.distinctUntilChanged()
			.subscribe((lastId: number) => {
				this.lastId = lastId;
			});
	}

	createTodo(description: string, isDone = false): TodoItem {
		let todo: TodoItem = {
			id: this.lastId + 1,
			description: description,
			isDone: isDone,
			updateDate: new Date(),
			createDate: new Date()
		};
		this.lastId++;

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