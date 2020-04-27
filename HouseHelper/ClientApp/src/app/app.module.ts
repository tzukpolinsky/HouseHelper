import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/shared/auth-guard.service';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CategoriesComponent } from './categories/categories.component';
import { MaterialModule } from './material/material.module';
import { UserComponent } from './user/user.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MsgComponent } from './shared/msg/msg.component';
import { SingleSubCategoryComponent } from './sub-categories/single-sub-category/single-sub-category.component';
import { LayoutComponent } from './layout/layout.component';
import { TokenInterceptor } from './app-auth.Interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CategoriesComponent,
    UserComponent,
    SubCategoriesComponent,
    MsgComponent,
    SingleSubCategoryComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LayoutComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'login', component: UserComponent}
    ])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
