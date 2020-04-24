import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { SelectorComponent } from "./selector/selector.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { OrganizerComponent } from "./organizer/organizer.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MomentPipe } from "./shared/date.pipe";
import { CalendarPipe } from "./shared/calendar.pipe";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    CalendarComponent,
    OrganizerComponent,
    MomentPipe,
    CalendarPipe,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
