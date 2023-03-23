import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableColumn } from '@po-ui/ng-components';

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
  items: Array<Task> = [];
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
    this.colunas = this.getColumns();
    this.getTasks();
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'ID', type: 'link', action: (row: string) => this.goToEdit(row) },
      { property: 'description', label: 'Descrição' },
      { property: 'dueDate', label: 'Data de Conclusão', type: 'date' },
      { property: 'finished', label: 'Concluído?', type: 'boolean'}
    ];
  }

  getTasks() {
    this.isFinished = false;
    this.taskService.getTasks().subscribe(
      (response) => {
        this.items = response;
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

