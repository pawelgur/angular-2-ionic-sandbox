import {TodoItem, TodosState, AppState} from "./todos.model";
import {Action} from "@ngrx/store";
import {TodosActions} from "./todos.actions";
import {Observable} from "rxjs/Rx";

let initialState: TodosState = {
	items: [],
	lastId: 0
};
// reducer must be pure function - no side effects
export function todosReducer(todosState: TodosState = initialState, action: Action): TodosState {
	console.log(" ");
	console.log('action:', action);
	let newState = getUpdatedState(todosState, action);
	console.log('state:', newState);
	return newState;
}

function getUpdatedState(todosState: TodosState, action: Action): TodosState {
	let todos = todosState.items;
	switch (action.type) {

		case TodosActions.GET_LIST_SUCCESS:
			let fetchedTodos = <TodoItem[]>action.payload;
			return {
				lastId: Math.max(...fetchedTodos.map(todo => todo.id)),
				items: [...fetchedTodos]
			};

		case TodosActions.CREATE_SUCCESS:
			return {
				lastId: action.payload.id,
				items: [...todos, action.payload]
			};

		case TodosActions.UPDATE_SUCCESS: // covers toggle
			let updatedTodo = <TodoItem> action.payload;
			let updatedTodos = todos.map(todo => {
				if (todo.id === updatedTodo.id) {
					return updatedTodo;
				}
				return todo;
			});
			return Object.assign({}, todosState, { items: updatedTodos });

		case TodosActions.REMOVE_SUCCESS:
			return Object.assign({}, todosState, { items: todos.filter(todo => todo.id !== action.payload) });

		default:
			return todosState;
	}
}

// selector
export function getTodos() {
	return (state: Observable<AppState>): Observable<TodoItem[]> => {
		return state.map((appState: AppState) => appState.todos)
					.map((todosState: TodosState) => todosState.items)
					.distinctUntilChanged();
	}
}