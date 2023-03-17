import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoDynamicFormField, PoModalAction, PoModalComponent, PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';

import { TasksService } from './../tasks.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild('formEditTarefa') formEditTarefa!: NgForm;
  @ViewChild('formExcluirTarefa') formExcluirTarefa!: NgForm;
  @ViewChild('modalEditarTarefa') modalEditarTarefa!: PoModalComponent;
  @ViewChild('modalExcluirTarefa') modalExcluirTarefa!: PoModalComponent;

  actions: Array<PoTableAction> = [
    { action: this.editarModal.bind(this), icon: 'po-icon-edit', label: 'Editar' },
    { action: this.excluirModal.bind(this), icon: 'po-icon-delete', label: 'Excluir' },
    ];
  camposFormularioEditar: Array<PoDynamicFormField> = [
    { property: 'description', label: 'Descrição', placeholder: 'Digite a descrição', required: true, minLength: 4, maxLength: 50, gridColumns: 12, gridSmColumns: 12 },
    { property: 'dueDate', label: 'Data de conclusão', placeholder: 'Informe a data', type: 'date', format: 'dd/mm/yyyy', required: true, gridColumns: 12, gridSmColumns: 12 },
    { property: 'finished', label: 'Concluído', type: 'boolean', booleanTrue: 'Sim', booleanFalse: 'Não', required: true, gridColumns: 12, gridSmColumns: 12 }
  ];
  camposFormularioExcluir: Array<PoDynamicFormField> = [
    { property: 'description', label: 'Descrição', disabled: true, gridColumns: 12, gridSmColumns: 12 },
    { property: 'dueDate', label: 'Data de conclusão', disabled: true, gridColumns: 12, gridSmColumns: 12 },
    { property: 'finished', label: 'Concluído', type: 'boolean', disabled: true, gridColumns: 12, gridSmColumns: 12 }
  ];
  colunas: Array<PoTableColumn> = [];
  dynamicFormEditar!: NgForm;
  dynamicFormExcluir!: NgForm;
  editar: PoModalAction = {
    action: () => {
      this.editarTarefa();
    },
    label: 'Salvar'
  };
  excluir: PoModalAction = {
    action: () => {
      this.excluirTarefa();
    },
    label: 'Excluir',
    danger: true
  };
  fecharEditar: PoModalAction = {
    action: () => {
      this.fecharEditarModal();
    },
    label: 'Cancelar'
  };
  fecharExcluir: PoModalAction = {
    action: () => {
      this.fecharExcluirModal();
    },
    label: 'Cancelar'
  };
  items: Array<Task> = [];
  isFinished: boolean = false;
  task: Task = {
    description: '',
    dueDate: new Date(),
    finished: false
  };

  constructor(
    private taskService: TasksService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.colunas = this.taskService.getColumns();
    this.getTasks();
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

  fecharEditarModal(): void {
    this.modalEditarTarefa.close();
  }

  fecharExcluirModal(): void {
    this.modalExcluirTarefa.close();
  }

  editarModal(task: Task) {
    this.task = task;
    this.modalEditarTarefa.open();
  }

  excluirModal(task: Task) {
    this.task = task;
    this.modalExcluirTarefa.open();
  }

  editarTarefa() {
    let taskId = this.task.id;
    if (this.dynamicFormEditar.form.invalid) {
      this.poNotification.warning('Preencha as informações.');
    } else {
      this.task = this.dynamicFormEditar.form.getRawValue();
      this.task = {
        ...this.task,
        id: taskId
      }
      this.taskService.editTask(this.task).subscribe(
        data => {
          this.getTasks();
          this.fecharEditarModal();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  excluirTarefa() {
    this.taskService.deleteTask(this.task).subscribe(
      data => {
        this.getTasks();
        this.fecharExcluirModal();
      },
      error => {
        console.log(error);
      }
    );
  }

  getFormEditar(form: NgForm) {
    this.dynamicFormEditar = form;
  }

  getFormExcluir(form: NgForm) {
    this.dynamicFormExcluir = form;
  }

  navegarCriar() {
    this.router.navigate(['/tasks/create'])
  }

}

