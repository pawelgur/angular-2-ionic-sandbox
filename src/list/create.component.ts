import {Output, EventEmitter, Component} from "@angular/core";
import {TodoItem} from "../todos/todos.model";
import {TodosService} from "../todos/todos.service";

@Component({
	selector: "todo-create",
	templateUrl: "create.component.html"
})
export class CreateComponent {
	description: string;

	@Output() create = new EventEmitter<TodoItem>();

	constructor(
		private todoHelper: TodosService
	){
	}

	onCreate() {
		this.create.emit(this.todoHelper.createTodo(this.description));
		this.description = "";
	}
}