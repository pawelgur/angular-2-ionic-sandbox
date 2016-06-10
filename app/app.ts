import {ViewChild, OpaqueToken, provide, Inject} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {App, MenuController, Nav} from 'ionic-angular';
import {provideStore, Store} from "@ngrx/store";
import {StateUpdates, mergeEffects} from "@ngrx/effects";
import "./rxjs-operators";
import {HomePage} from "./home/home.page";
import {ListPage} from "./list/list.page";
import {FooterComponent} from "./footer/footer.component";
import {TodosClient} from "./todos/todos.client";
import {todosReducer} from "./todos/todos.reducer";
import {TodosService} from "./todos/todos.service";
import {TodosEffects} from "./todos/todos.effects";
import {AppState} from "./todos/todos.model";


const EFFECTS = new OpaqueToken('Effects');

@App({
	templateUrl: 'build/app.html',
	providers: [
		provideStore({todos: todosReducer}),
		provide(EFFECTS, { multi: true, useClass: TodosEffects }), // runEffects(TodosEffects) doesn't work for some reason (initializing in component and not in bootstrap?)
		HTTP_PROVIDERS, TodosClient, TodosService, StateUpdates
	],
	directives: [FooterComponent],
	config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
	rootPage: any = ListPage;
	listPage = ListPage;
	homePage = HomePage;
	@ViewChild(Nav) nav;

	constructor(
		private menu: MenuController,
		private store: Store<AppState>,
		@Inject(EFFECTS) effects: any[]
	) {
		mergeEffects(effects).subscribe(store); // run effects explicitly
	}

	openPage(page: any) {
		this.nav.setRoot(page);
		// if root is set somewhere else (with Nav), this.rootPage doesn't update (some kind of two-way binding is needed here)
		// this.rootPage = page;
		this.menu.close();
	}
}
