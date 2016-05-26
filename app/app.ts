import {ViewChild} from "@angular/core";
import {App, MenuController, Nav} from 'ionic-angular';
import {HomePage} from "./home/home.page";
import {ListPage} from "./list/list.page";
import {TodoService} from "./todo.service";
import {FooterComponent} from "./common/footer.component";


@App({
  templateUrl: 'build/app.html',
  providers: [TodoService],
  directives: [FooterComponent],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = ListPage;
  listPage = ListPage;
  homePage = HomePage;
  @ViewChild(Nav) nav;

  constructor(
      private menu: MenuController
  ) {
  }

  openPage(page: any) {
    this.nav.setRoot(page);
    // if root is set somewhere else (with Nav), this.rootPage doesn't update (some kind of two-way binding is needed here)
    // this.rootPage = page;
    this.menu.close();
  }
}
