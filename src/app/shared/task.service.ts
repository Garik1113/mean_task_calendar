import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
export interface Task {
  _id?: string;
  date: number;
  title: string;
}
@Injectable({
  providedIn: "root",
})
export class TaskService {
  public tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  private taskUrl = "http://localhost:3000/addNewTask";
  private getTasksUrl = "http://localhost:3000/getTasks";
  private deleteTaskUrl = "http://localhost:3000/delete";

  constructor(private http: HttpClient) {}
  getTasks(date: moment.Moment): Observable<Task[]> {
    const day = date.format("D");
    return this.http
      .get<any>(`${this.getTasksUrl}/${day}`)
      .pipe(tap((res) => this.tasks.next(res)));
  }
  addNewTask(title: string, day: number): Observable<Task> {
    if (title) {
      this.tasks.value.push({ date: day, title });
      return this.http.post<any>(this.taskUrl, {
        day,
        title,
      });
    }
  }
  deleteTask(id: string): Observable<Task> {
    const value = this.tasks.value.filter((e) => e._id !== id);
    this.tasks.next(value);
    return this.http.delete<any>(`${this.deleteTaskUrl}/${id}`);
  }
}
