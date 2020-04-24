import { Pipe, PipeTransform } from "@angular/core";
import { Moment } from "moment";

@Pipe({
  name: "momentPipe",
  pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(date: Moment, format: string = "MMMM YYYY"): string {
    return date.format(format);
  }
}
