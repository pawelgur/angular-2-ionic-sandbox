import {Component, Input} from "@angular/core";
import {TodoItem} from "../todo.model";

@Component({
	selector: "todo-preview",
	template: `
		Id: {{todo.id}}, Title: {{todo.title}} <br />
		Description: {{todo.description}} <br />
	`
})
export class TodoPreviewComponent {
	@Input()
	todo: TodoItem;
}