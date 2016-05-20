import {Component} from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

@Component({
	selector: "navigation",
	template: `
	<nav class="navbar navbar-default">
		<ul class="nav navbar-nav">
			<li><a [routerLink]="['List']">List</a></li>
		</ul>
	</nav>`,
	directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent {


}