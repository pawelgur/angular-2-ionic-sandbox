import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {TodoPreviewComponent} from "./todo-preview.component";
import {TodoItem} from "../todo/todo.model";

@Component({
	selector: "latest-done",
	template: `
	<ion-icon name="checkmark-circle" secondary medium></ion-icon>
	<ion-badge>{{ todo?.updateDate | date:"HHmmss" }}</ion-badge>
	<todo-preview [todo]="todo" *ngIf="todo"></todo-preview>
	`,
	directives: [TodoPreviewComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestDoneComponent {
	@Input() todo: TodoItem;
}

// using async with store made all implementation redundant [nice] (check previous versions of this file)