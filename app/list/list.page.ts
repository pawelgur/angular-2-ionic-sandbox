import {Page, NavController} from "ionic-angular";
import {ListComponent} from "./list.component";
import {CreateComponent} from "./create.component";
import {TodoItem, AppState, TodosState} from "../todos/todos.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {DetailsPage} from "../details/details.page";
import {TodosActions} from "../todos/todos.actions";
import {getTodos} from "../todos/todos.reducer";

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
		this.todos = store.let(getTodos());
	}

	onCreate(todo: TodoItem) {
		this.store.dispatch(TodosActions.create(todo));
	}

	onRemove(id: number) {
		this.store.dispatch(TodosActions.remove(id));
	}

	onToggle(todo: TodoItem) {
		// maybe this update code should be in reducer? Maybe yes, but problem is with supplying final object to api
		todo.updateDate = new Date();
		todo.isDone = !todo.isDone;
		this.store.dispatch(TodosActions.toggle(todo));
	}

	onEdit(todo: TodoItem) {
		this.nav.push(DetailsPage, { todo: todo });
	}

}