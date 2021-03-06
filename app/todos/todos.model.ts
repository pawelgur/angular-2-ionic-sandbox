import {Action} from "@ngrx/store";

export interface TodoItem {
	id: number;
	title?: string;
	description: string;
	category?: string;
	isDone: boolean;
	updateDate: Date;
	createDate: Date;
}

export interface TodoDto {
	id: number;
	title?: string;
	description: string;
	category?: string;
	isDone: boolean;
	updateDate: string;
	createDate: string;
}

export interface AppState {
	todos: TodosState
}

export interface TodosState {
	items: TodoItem[],
	lastId: number,
	actions: Action[],
	prePersistedObjects: TodoItem[],
	undoEnabled: boolean
}