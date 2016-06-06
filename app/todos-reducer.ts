import {TodoItem, ACTIONS} from "./todo/todo.model";
import {ActionReducer, Action} from "@ngrx/store";

export const todosReducer: ActionReducer<TodoItem[]> = (todos: TodoItem[] = [], action: Action) => {
	console.log(action);
	switch (action.type) {
		case ACTIONS.TODOS.CREATE:
			return [...todos, action.payload];
		case ACTIONS.TODOS.UPDATE:
			let updatedTodo = <TodoItem> action.payload;
			updatedTodo.updateDate = new Date();
			return todos.map(todo => {
				if (todo.id === updatedTodo.id) {
					return updatedTodo;
				}
				return todo;
			});
		case ACTIONS.TODOS.REMOVE:
			return todos.filter(todo => todo.id !== action.payload);
		case ACTIONS.TODOS.TOGGLE:
			return todos.map(todo => {
				if(todo.id === action.payload) {
					todo.updateDate = new Date();
					todo.isDone = !todo.isDone;
				}
				return todo;
			});
		default:
			return todos;
	}
};