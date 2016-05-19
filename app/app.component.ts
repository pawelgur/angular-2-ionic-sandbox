import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {ListComponent} from "./list.component";
import {TodoService} from "./todo.service";
import {DetailsComponent} from "./details.component";
import {NavigationComponent} from "./navigation.component";

@Component({
	selector: "application",
	template: `
		<h1>This is super cool angular v2 app</h1>
		<navigation></navigation>
		<router-outlet></router-outlet>`,
	directives: [ROUTER_DIRECTIVES, ListComponent, DetailsComponent, NavigationComponent],
	providers: [ROUTER_PROVIDERS, TodoService]
})
@RouteConfig([
	{
		path: "/list",
		name: "List",
		component: ListComponent,
		useAsDefault: true
	},
	{
		path: "/details/:id",
		name: "Details",
		component: DetailsComponent
	}
])
export class AppComponent {

}