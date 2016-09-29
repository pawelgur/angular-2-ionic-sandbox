import {NavController} from "ionic-angular";
import {ListPage} from "../list/list.page";
import { Component } from "@angular/core";

@Component({
	templateUrl: "home.page.html"
})
export class HomePage {
	constructor(
		private nav: NavController
	){}

	openList() {
		this.nav.setRoot(ListPage, { animate: true });
	}
}