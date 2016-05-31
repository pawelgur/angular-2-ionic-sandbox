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