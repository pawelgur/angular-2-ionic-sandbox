import {Page, NavController} from "ionic-angular";
import {ListPage} from "../list/list.page";

@Page({
	templateUrl: "build/home/home.page.html"
})
export class HomePage {
	constructor(
		private nav: NavController
	){}

	openList() {
		this.nav.setRoot(ListPage, { animate: true });
	}
}