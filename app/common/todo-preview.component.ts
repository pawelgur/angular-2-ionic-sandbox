import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {TodoItem} from "../todo/todo.model";

@Component({
	selector: "todo-preview",
	template: `<ion-badge secondary>
		[{{todo.id}}] 
		<span *ngIf="todo.title"><i>{{todo.title}}</i> -</span> 
		{{todo.description}}
	</ion-badge>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPreviewComponent {
	@Input() todo: TodoItem;
}