import {Component} from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

@Component({
	selector: "navigation",
	template: `
	<nav>
		<ul>
			<li><a [routerLink]="['List']">List</a></li>
		</ul>
	</nav>`,
	directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent {


}