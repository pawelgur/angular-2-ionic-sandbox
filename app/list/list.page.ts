import {Page, NavController} from "ionic-angular";
import {ListComponent} from "./list.component";
import {CreateComponent} from "./create.component";
import {TodoItem, AppState} from "../todos/todos.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {DetailsPage} from "../details/details.page";
import {TodosActions} from "../todos/todos.actions";
import {getTodos, getUndoEnabled} from "../todos/todos.reducer";

@Page({
	templateUrl: "build/list/list.page.html",
	directives: [ListComponent, CreateComponent]
})
export class ListPage {
	todos: Observable<TodoItem[]>;
	undoEnabled: Observable<boolean>;

	constructor(
		private store: Store<AppState>,
		private nav: NavController
	){
		this.todos = store.let(getTodos());
		this.undoEnabled = store.let(getUndoEnabled());
	}

	onCreate(todo: TodoItem) {
		this.store.dispatch(TodosActions.create(todo));
	}

	onRemove(id: number) {
		this.store.dispatch(TodosActions.remove(id));
	}

	onToggle(todo: TodoItem) {
		// maybe this update code should be in reducer? Maybe yes, but problem is with supplying final object to api
		let updatedTodo = Object.assign({}, todo); // don't mutate current state directly
		updatedTodo.updateDate = new Date();
		updatedTodo.isDone = !updatedTodo.isDone;
		this.store.dispatch(TodosActions.toggle(updatedTodo));
	}

	onEdit(todo: TodoItem) {
		this.nav.push(DetailsPage, { todo: todo });
	}

	undo() {
		this.store.dispatch(TodosActions.undo());
	}

}