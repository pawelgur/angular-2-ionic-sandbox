import {TodoItem, TodosState, AppState} from "./todos.model";
import {Action} from "@ngrx/store";
import {TodosActions} from "./todos.actions";
import {Observable} from "rxjs/Rx";

let initialState: TodosState = {
	items: [],
	lastId: 0,
	actions: [], // commited server persisting actions (DELETE, UPDATE, CREATE)
	prePersistedObjects: [], // original objects before persisting them to server (before DELETE, UPDATE, CREATE)
	undoEnabled: false
};

// reducer must be pure function - no side effects
export function todosReducer(todosState: TodosState = initialState, action: Action): TodosState {
	// looks like undo functionality is not so easy as documented when persisting to server is involved

	let newState: TodosState;

	console.log('ACTION: ', action.type);
	newState = getUpdatedState(todosState, action);
	newState = getUpdatedStateUndoable(newState, action);
	console.log('state:', newState);

	return newState;
}

function getUpdatedState(todosState: TodosState, action: Action): TodosState {
	let todos = todosState.items;

	// update state after successful server action

	switch (action.type) {

		case TodosActions.GET_LIST_SUCCESS:
			let fetchedTodos = <TodoItem[]>action.payload;
			return Object.assign({}, todosState, {
				lastId: Math.max(...fetchedTodos.map(todo => todo.id)),
				items: [...fetchedTodos]
			});

		case TodosActions.CREATE_SUCCESS:
			return Object.assign({}, todosState, {
				lastId: action.payload.id,
				items: [...todos, action.payload]
			});

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


function getUpdatedStateUndoable(todosState: TodosState, action: Action): TodosState {
	let actions = [...todosState.actions, action];

	// save actions which change data on server (actions) and original data (prePersistedObjects) before action changes it
	// so we can undo them later (e.g. CREATE (opposite-action) object (prePersistedObject) after it was REMOVEd (action))

	switch (action.type) {

		case TodosActions.UPDATE:
		case TodosActions.TOGGLE:
			let updatedTodo = todosState.items.find(todo => todo.id === action.payload.id); // payload holds already updated object, we need original one
			return Object.assign({}, todosState, {
				actions: actions,
				prePersistedObjects: [...todosState.prePersistedObjects, updatedTodo],
				undoEnabled: true
			});

		case TodosActions.REMOVE:
			let removedObject = todosState.items.find(todo => todo.id === action.payload);
			return Object.assign({}, todosState, {
				actions: actions,
				prePersistedObjects: [...todosState.prePersistedObjects, removedObject],
				undoEnabled: true
			});

		case TodosActions.CREATE:
			return Object.assign({}, todosState, {
				actions: actions,
				prePersistedObjects: [...todosState.prePersistedObjects, action.payload],  // add new object so we can get its id for removal
				undoEnabled: true
			});

		case TodosActions.UNDO_SUCCESS:
			// after successful undo action remove last action and object from state
			let updatedActions = todosState.actions.slice(0, todosState.actions.length - 1);
			let updatedObjects = todosState.prePersistedObjects.slice(0, todosState.prePersistedObjects.length - 1)
			return Object.assign({}, todosState, {
				actions: updatedActions,
				prePersistedObjects: updatedObjects,
				undoEnabled: updatedActions.length && updatedObjects.length
			});

		default:
			return todosState;
	}
}

// selectors

export function getTodos() {
	return (state: Observable<AppState>): Observable<TodoItem[]> => {
		return state.map((appState: AppState) => appState.todos)
					.map((todosState: TodosState) => todosState.items)
					.distinctUntilChanged();
	};
}

export function getUndoEnabled() {
	return (state: Observable<AppState>): Observable<boolean> => {
		return state.map((appState: AppState) => appState.todos)
			.map((todosState: TodosState) => todosState.undoEnabled)
			.distinctUntilChanged();
	};
}