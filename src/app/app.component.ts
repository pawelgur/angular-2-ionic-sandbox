import {ViewChild, OpaqueToken, Inject, Component} from "@angular/core";
import {MenuController, Nav} from 'ionic-angular';
import {Store} from "@ngrx/store";
import {mergeEffects} from "@ngrx/effects";
import "../rxjs-operators";
import {HomePage} from "../home/home.page";
import {ListPage} from "../list/list.page";
import {AppState} from "../todos/todos.model";

export const EFFECTS = new OpaqueToken('Effects');

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = ListPage;
	listPage = ListPage;
	homePage = HomePage;
	@ViewChild(Nav) nav;

	constructor(
		private menu: MenuController,
		private store: Store<AppState>,
		// @Inject(EFFECTS) effects: any[]
	) {
		// mergeEffects(effects).subscribe(store); // run effects explicitly
	}

	openPage(page: any) {
		this.nav.setRoot(page);
		// if root is set somewhere else (with Nav), this.rootPage doesn't update (some kind of two-way binding is needed here)
		// this.rootPage = page;
		this.menu.close();
	}
}
