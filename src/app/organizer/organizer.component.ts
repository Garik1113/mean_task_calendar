import { Component, OnInit } from "@angular/core";
import { DateService } from "../shared/date.service";
import { TaskService } from "../shared/task.service";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"],
})
export class OrganizerComponent implements OnInit {
  public taskTitle: string;
  constructor(
    public taskService: TaskService,
    private dateService: DateService
  ) {}

  addNewTask(): void {
    if (this.taskTitle) {
      const day = this.dateService.date.value.format("D");
      this.taskService.addNewTask(this.taskTitle, Number(day)).subscribe();
      this.taskTitle = "";
    }
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe();
  }
  ngOnInit() {
    this.taskService
      .getTasks(this.dateService.date.value)
      .subscribe((e) => console.log(e));
  }
}
