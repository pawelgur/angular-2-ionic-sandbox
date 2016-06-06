import {Page, NavController} from "ionic-angular";
import {ListComponent} from "./list.component";
import {CreateComponent} from "./create.component";
import {TodoItem, AppState, ACTIONS} from "../todo/todo.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {DetailsPage} from "../details/details.page";

@Page({
	templateUrl: "build/list/list.page.html",
	directives: [ListComponent, CreateComponent]
})
export class ListPage {
	todos: Observable<TodoItem[]>;

	constructor(
		private store: Store<AppState>,
		private nav: NavController
	){
		this.todos = store.select("todos");
	}

	onCreate(todo: TodoItem) {
		this.store.dispatch({
			type: ACTIONS.TODOS.CREATE,
			payload: todo
		});
	}

	onRemove(id: number) {
		this.store.dispatch({
			type: ACTIONS.TODOS.REMOVE,
			payload: id
		});
	}

	onToggle(id: number) {
		this.store.dispatch({
			type: ACTIONS.TODOS.TOGGLE,
			payload: id
		});
	}

	onEdit(todo: TodoItem) {
		this.nav.push(DetailsPage, { todo: todo });
	}

}