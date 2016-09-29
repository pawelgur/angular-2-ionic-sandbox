import { Injectable } from "@angular/core";
import {TodoItem, AppState, TodosState} from "./todos.model";
import {TodosClient} from "./todos.client";
import {StateUpdates, Effect} from "@ngrx/effects";
import {TodosActions} from "./todos.actions";
import {Observable, ReplaySubject} from "rxjs/Rx";
import {Action} from "@ngrx/store";

@Injectable()
export class TodosEffects {

	constructor(
		private todoClient: TodosClient,
		private updates: StateUpdates<AppState>
	) {
	}

	/*
	 	In real world app whole state will not be persisted to server as standard resource based REST API will be used
	 */

	// if not footer todos, this could be triggered only on opening list page
	// todo: implement spinner
	@Effect() getList = this.todoClient.getTodos()
		.map((todos: TodoItem[]) => TodosActions.getListSuccess(todos))
		.catch((info) => Observable.of({ type: "error", payload: info }));

	@Effect() create = this.updates
		.whenAction(TodosActions.CREATE)
		.map(update => update.action.payload)
		.switchMap((todo: TodoItem) => this.callCreate(todo));  // switch original observable with one returned from callCreate()

	@Effect() update = this.updates
		.whenAction(TodosActions.UPDATE, TodosActions.TOGGLE)
		.map(update => update.action.payload)
		.switchMap((todo: TodoItem) => this.callUpdate(todo));

	@Effect() remove = this.updates
		.whenAction(TodosActions.REMOVE)
		.map(update => update.action.payload)
		.switchMap((id: number) => this.callRemove(id));

	// we get last server persisting action and call opposite action with previous object (before original action ran),
	// after getting server action success app updates state accordingly if it would be standard action, after that we also
	// trigger undo_success to remove last action and previous object
	@Effect() undo = this.updates
		.whenAction(TodosActions.UNDO)
		.map((update) => update.state.todos)
		.switchMap((todos: TodosState) => {
			let lastAction: Action = todos.actions[todos.actions.length - 1];
			let lastObject: TodoItem = todos.prePersistedObjects[todos.prePersistedObjects.length - 1];
			if (lastAction && lastObject) {
				// todo: let undo only after success (currently if update is failed or not yet complete you can do a redo)
				// todo: handle error and don't return success
				switch (lastAction.type) {
					case TodosActions.CREATE:
						// do REMOVE
						return Observable.concat(this.callRemove(lastObject.id), this.getUndoSuccess());
					case TodosActions.REMOVE:
						// do CREATE
						return Observable.concat(this.callCreate(lastObject), this.getUndoSuccess());
					case TodosActions.TOGGLE:
					case TodosActions.UPDATE:
						// do UPDATE
						return Observable.concat(this.callUpdate(lastObject), this.getUndoSuccess());
				}
			}
		});

	// note: it's quite nice that it's not possible to edit state anywhere else than in reducer by action
	// (I had natural intention to update actions array in effect after undo which would be soo hacky - now I've create
	//  a new "UNDO_SUCCESS" action which will trigger state update in reducer)

	callRemove(id: number) {
		return this.todoClient.deleteTodo(id)
			.map(() => TodosActions.removeSuccess(id))
			.catch(this.handleError);
	}

	callCreate(todo: TodoItem) {
		return this.todoClient.createTodo(todo)
			.map(() => TodosActions.createSuccess(todo))
			.catch(this.handleError);
	}

	callUpdate(todo: TodoItem) {
		return this.todoClient.updateTodo(todo)
			.map(() => TodosActions.updateSuccess(todo))
			.catch(this.handleError);
	}

	handleError(info) {
		return Observable.of({ type: "error", payload: info });
	}

	getUndoSuccess() {
		// additionall undo success action needed to remove last action and prePersistedObject
		let subject = new ReplaySubject<Action>();
		subject.next(TodosActions.undoSuccess());
		return subject;
	}


}