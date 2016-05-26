import {Component} from "@angular/core";
import {LatestDoneComponent} from "./latest-done.component";
import {LatestAddedComponent} from "./latest-added.component";

@Component({
	selector: "todo-footer",
	directives: [LatestDoneComponent, LatestAddedComponent],
	template: `<ion-toolbar position="bottom">
		<latest-added></latest-added>
		<latest-done></latest-done>
	</ion-toolbar>`
})
export class FooterComponent {


}