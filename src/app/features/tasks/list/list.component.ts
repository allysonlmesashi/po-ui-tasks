import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  actionsPage: Array<PoPageAction> = [
    { label: 'Nova Tarefa', action: this.goToCreate.bind(this) }
  ];
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Tarefas' }
    ]
  };
  colunas: Array<PoTableColumn> = [];
  dynamicFormExcluir!: NgForm;
  filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    placeholder: 'Busca por descrição'
  };
  items: Array<Task> = [];
  itemsReturned: Array<Task> = [];
  isFinished: boolean = false;
  task: Task = {
    description: '',
    dueDate: new Date(),
    finished: false
  };

  constructor(
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.colunas = this.taskService.getColumns();
    const index = this.colunas.findIndex(coluna => coluna.type === 'link');
    index >= 0 ? this.colunas[index].action = (row: string) => this.goToEdit(row) : undefined;
    this.getTasks();
  }

  filterAction(filter: string) {
    this.items = this.itemsReturned.filter(item => item.description.includes(filter));
  }

  getTasks() {
    this.isFinished = false;
    this.taskService.getTasks().subscribe(
      (response) => {
        this.items = response;
        this.itemsReturned = [...this.items];
        this.isFinished = true;
      },
      error => {
        console.log(error);
        this.isFinished = true;
      }
    );
  }

  goToCreate() {
    this.router.navigate(['/tasks/new'])
  }

  goToEdit(id: string) {
    this.router.navigate(['/tasks/edit', id])
  }

}

