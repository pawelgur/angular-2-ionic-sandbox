import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {TodoItem, TodoDto} from "./todos.model";
import {TodosService} from "./todos.service";

@Injectable()
export class TodosClient {
	todosUrl = "http://localhost:8888/todos";
	commonOptions: RequestOptions;

	constructor(
		private http: Http,
		private todoHelper: TodosService
	){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		this.commonOptions = new RequestOptions({ headers: headers });
	}

	getTodos(): Observable<TodoItem[]> {
		return this.http
			.get(this.todosUrl)
			.map(this.unwrap())
			.map((todos: TodoDto[]) => {
				return todos.map(this.mapTodo)
					.sort(this.todoHelper.todoUpdateComparator("createDate"));
			});
	}

	getTodo(id: number): Observable<TodoItem> {
		return this.http
			.get(`${this.todosUrl}/${id}`)
			.map(this.unwrap())
			.map(this.mapTodo);
	}

	createTodo(todo: TodoItem): Observable<any> {
		let body = JSON.stringify(todo);

		return this.http
			.post(this.todosUrl, body, this.commonOptions);
	}

	updateTodo(todo: TodoItem): Observable<any> {
		let body = JSON.stringify(todo);

		return this.http
			.put(`${this.todosUrl}/${todo.id}`, body, this.commonOptions);
	}

	deleteTodo(id: number): Observable<any> {
		return this.http
			.delete(`${this.todosUrl}/${id}`);
	}

	unwrap() {
		return (response: Response) => response.json();
	}

	mapTodo(todoDto: TodoDto): TodoItem {
		let todo: TodoItem = Object.assign({} as TodoItem, todoDto);
		todo.createDate = new Date(todoDto.createDate);
		todo.updateDate = new Date(todoDto.updateDate);
		return todo;
	}
}