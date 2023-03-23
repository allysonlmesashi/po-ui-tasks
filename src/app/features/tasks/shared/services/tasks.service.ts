import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoTableColumn } from '@po-ui/ng-components';

import { environment } from '../../../../../../src/environments/environment';
import { Task } from '../../../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  APIRest = environment.API;

  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.APIRest);
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.APIRest}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.APIRest, task);
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.APIRest}/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.APIRest}/${task.id}`);
  }

}
