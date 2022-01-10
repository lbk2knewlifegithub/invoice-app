import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackBarService } from "@lbk/ui";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, CoreModule } from "./core";
import { StateModule } from "./state";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StateModule.forRoot(),
  ],
  providers: [SnackBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
