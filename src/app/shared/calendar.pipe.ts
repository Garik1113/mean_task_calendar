import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "calendarPipe",
})
export class CalendarPipe implements PipeTransform {
  transform(date: moment.Moment, format: string = "DD"): string {
    return date.format(format);
  }
}
