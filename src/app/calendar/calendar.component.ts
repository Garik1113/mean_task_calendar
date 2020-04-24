import { Component, OnInit } from "@angular/core";
import { DateService } from "../shared/date.service";
import { Moment } from "moment";
import * as moment from "moment";
import { TaskService } from "../shared/task.service";

interface Day {
  value: moment.Moment;
  active: boolean;
  selected: boolean;
  disabled: boolean;
}
interface Week {
  days: Day[];
}
@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {}
  public calendar: Week[];
  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }
  generate(now: Moment): void {
    const startDay = now.clone().startOf("month").startOf("week");
    const endDay = now.clone().endOf("month").endOf("week");
    const date = startDay.clone().subtract(1, "day");
    const calendar = [];
    while (date.isBefore(endDay, "day")) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, "day").clone();
            const active = now.isSame(value, "day");
            const selected = false;
            const disabled = !now.isSame(value, "month");
            return {
              value,
              active,
              selected,
              disabled,
            };
          }),
      });
    }

    this.calendar = calendar;
  }
  selectDay(date: Moment) {
    this.dateService.setDate(date);
    this.taskService.getTasks(date).subscribe();
  }
}
