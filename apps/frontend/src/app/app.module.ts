import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, CoreModule } from "./core";
import { CustomReuseStrategy } from "./shared";
import { StateModule } from "./state";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StateModule.forRoot(),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
