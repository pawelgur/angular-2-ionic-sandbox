import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoItem} from "../todo/todo.model";

@Component({
	selector: "latest-added",
	template: `
	<ion-icon name="add-circle" secondary medium></ion-icon>
	<ion-badge>{{ todo?.createDate | date:"HHmmss" }}</ion-badge>
	<todo-preview [todo]="todo" *ngIf="todo"></todo-preview>
	`,
	directives: [TodoPreviewComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestAddedComponent {
	@Input() todo: TodoItem;
}