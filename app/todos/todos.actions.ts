import {Injectable} from "@angular/core";
import {TodoItem} from "./todos.model";
import {Action} from "@ngrx/store";

@Injectable()
export class TodosActions {

	static CREATE = "todo-create";
	static create(todo: TodoItem): Action {
		return {
			type: TodosActions.CREATE,
			payload: todo
		};
	}
   	static CREATE_SUCCESS = "todo-create-success";
	static createSuccess(todo: TodoItem): Action {
		return {
			type: TodosActions.CREATE_SUCCESS,
			payload: todo
		};
	}

	static REMOVE = "todo-remove";
	static remove(id: number): Action {
		return {
			type: TodosActions.REMOVE,
			payload: id
		};
	}
	static REMOVE_SUCCESS = "todo-remove-success";
	static removeSuccess(id: number): Action {
		return {
			type: TodosActions.REMOVE_SUCCESS,
			payload: id
		};
	}

	static TOGGLE = "todo-toggle";
	static toggle(todo: TodoItem): Action {
		return {
			type: TodosActions.TOGGLE,
			payload: todo
		};
	}

	static UPDATE = "todo-update";
	static update(todo: TodoItem): Action {
		return {
			type: TodosActions.UPDATE,
			payload: todo
		};
	}
	static UPDATE_SUCCESS = "todo-update-success";
	static updateSuccess(todo: TodoItem): Action {
		return {
			type: TodosActions.UPDATE_SUCCESS,
			payload: todo
		};
	}

	static GET_LIST_SUCCESS = "todo-get-list-success";
	static getListSuccess(todos: TodoItem[]): Action {
		return {
			type: TodosActions.GET_LIST_SUCCESS,
			payload: todos
		};
	}


}