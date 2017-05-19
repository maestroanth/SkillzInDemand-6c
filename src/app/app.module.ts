import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroSearchComponent } from './hero-search.component';

/*NOTES
An Observable is a stream of events that you can process with array-like operators.

Angular core has basic support for observables. Developers augment that support with
operators and extensions from the RxJS library. (i.e. .toPromise())

But requests aren't always done only once. You may start one request, cancel it, and make a different request before the server has responded to the first request.

A request-cancel-new-request sequence is difficult to implement with Promises, but easy with Observables.


*/

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
      HeroesComponent,
      HeroSearchComponent
  ],
  providers: [
      HeroService//provides this service as singleton when from root (get rid of them in other components to prevent multiple instances)
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
