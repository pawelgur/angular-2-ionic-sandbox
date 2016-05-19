export interface TodoItem {
	id: number;
	title?: string;
	description: string;
	category?: string;
	isDone: boolean;
}