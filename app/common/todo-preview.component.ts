import {Component, Input} from "@angular/core";
import {TodoItem} from "../todo.model";

@Component({
	selector: "todo-preview",
	template: `<ion-badge secondary>[{{todo.id}}] {{todo.description}}</ion-badge>	`
})
export class TodoPreviewComponent {
	@Input()
	todo: TodoItem;
}