import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GamesComponent } from './components/games/games.component';
import { GenresComponent } from './components/genres/genres.component';
import { TagsComponent } from './components/tags/tags.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { NewAttributeComponent } from './components/new-attribute/new-attribute.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '', 
    component: GamesComponent,
  },
  {
    path: 'genres', 
    component: GenresComponent,
  },
  {
    path: 'genre/:genreId',
    component: GamesComponent
  },
  {
    path: 'search/:value',
    component: SearchComponent
  },
  {
    path: 'allTags', 
    component: TagsComponent,
  },
  {
    path: 'tag/:tagId',
    component: GamesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addGame',
    component: NewGameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addAttribute/:type',
    component: NewAttributeComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GamesComponent,
    GenresComponent,
    TagsComponent,
    LoginComponent,
    NewGameComponent,
    NewAttributeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
