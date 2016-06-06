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
	todos: TodoItem[]
}

export const ACTIONS = {
	TODOS: {
		CREATE: "todo-create",
		REMOVE: "todo-remove",
		TOGGLE: "todo-toggle",
		UPDATE: "todo-update"
	}
};