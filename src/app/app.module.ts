import { NgModule } from '@angular/core';
import { HttpModule} from "@angular/http";
import { IonicApp, IonicModule } from 'ionic-angular';
import {provideStore} from "@ngrx/store";
import {StateUpdates} from "@ngrx/effects";

import {TodosClient} from "../todos/todos.client";
import {todosReducer} from "../todos/todos.reducer";
import {TodosService} from "../todos/todos.service";
import {TodosEffects} from "../todos/todos.effects";
import { HomePage } from '../home/home.page';
import { MyApp, EFFECTS } from './app.component';
import { FooterComponent } from "../footer/footer.component";
import { DetailsPage } from "../details/details.page";
import { ListPage } from "../list/list.page";
import { CaseLengthValidator } from "../details/case-length.validator";
import { ValidationMessageComponent } from "../details/validation-message.component";
import { LatestAddedComponent } from "../footer/latest-added.component";
import { LatestDoneComponent } from "../footer/latest-done.component";
import { TodoPreviewComponent } from "../footer/todo-preview.component";
import { CreateComponent } from "../list/create.component";
import { ListComponent } from "../list/list.component";

export function ionicFactory() {
	return IonicModule.forRoot(MyApp);
}

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		FooterComponent,
		DetailsPage,
		ListPage,
		CaseLengthValidator,
		ValidationMessageComponent,
		LatestAddedComponent,
		LatestDoneComponent,
		TodoPreviewComponent,
		CreateComponent,
		ListComponent
	],
	imports: [
		ionicFactory,
		// IonicModule.forRoot(MyApp),
		// HttpModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		// MyApp,
		// HomePage
	],
	providers: [
		// provideStore({todos: todosReducer}),
		// { provide: EFFECTS, multi: true, useClass: TodosEffects }, // runEffects(TodosEffects) doesn't work for some reason (initializing in component and not in bootstrap?)
		// TodosClient, TodosService, StateUpdates
	]
})
export class AppModule {}