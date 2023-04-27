import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageEditLiterals, PoBreadcrumb, PoDynamicFormField, PoNotificationService, PoDialogService } from '@po-ui/ng-components';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('formCriarTarefa') formCriarTarefa!: NgForm;

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Tarefas', link: '/tasks' },
      { label: 'Nova Tarefa' }
    ]
  };
  camposFormulario: Array<PoDynamicFormField> = [
    { property: 'description', label: 'Descrição', placeholder: 'Digite a descrição', required: true, clean: true, minLength: 4, maxLength: 50, gridColumns: 12, gridSmColumns: 12 },
    { property: 'dueDate', label: 'Data de Conclusão', placeholder: 'Informe a data de conclusão', type: 'date', format: 'dd/mm/yyyy', required: true, clean: true, gridColumns: 12, gridSmColumns: 12 },
    { property: 'finished', label: 'Concluído', type: 'boolean', booleanTrue: 'Sim', booleanFalse: 'Não', disabled: true }
  ];
  customLiterals: PoPageEditLiterals = {
    saveNew: 'Salvar e nova',
    save: 'Salvar'
  };
  dynamicForm!: NgForm;
  isDisabledButton: boolean = false;
  isLoading: boolean = false;
  operation: string = 'post';
  task: Task = {
    description: '',
    finished: false
  };
  title: string = 'Nova Tarefa';

  constructor(
    private taskService: TasksService,
    private poNotification: PoNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    this.setOperation();
    this.setTitle();
    if(this.operation == 'put') {
      this.getTaskById();
      this.camposFormulario[2].disabled = false;
    }
  }

  cancelarCriarTarefa() {
    this.router.navigate(['/tasks']);
  }

  salvarTarefa(isSaveNew: boolean) {
    if (this.dynamicForm.form.invalid) {
      this.poNotification.warning('Preencha as informações.');
    } else {
      this.isDisabledButton = true;
      this.isLoading = true;
      this.task = this.dynamicForm.form.getRawValue();
      if (this.operation == 'post') {
        this.task = {
          ...this.task,
          finished: false
        }
        this.post(isSaveNew)
      } else {
        this.task = {
          id: this.activatedRoute.snapshot.params['id'],
          ...this.task
        }
        this.put(isSaveNew);
      }
    }
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  getTaskById(): void {
    this.isLoading = true;
    this.taskService.getTaskById(this.activatedRoute.snapshot.params['id']).subscribe(
      (task: Task) => {
        this.task = task;
        this.isLoading = false;
       },
      error => {
        this.poNotification.error('Erro na criação da tarefa.');
        this.isLoading = false;
      }
    )
  }

  post(isSaveNew: boolean): void {
    this.taskService.addTask(this.task).subscribe(
      data => {
        this.poNotification.success('Tarefa criada com sucesso.');
        if(isSaveNew == false) {
          this.router.navigate(['/tasks'])
        } else {
          this.dynamicForm.reset();
        }
        this.isDisabledButton = false;
        this.isLoading = false;
      },
      error => {
        this.poNotification.error('Erro na criação da tarefa.');
        this.isDisabledButton = false;
        this.isLoading = false;
      }
    );
  }

  put(isSaveNew: boolean): void {
    this.taskService.editTask(this.task).subscribe(
      data => {
        this.poNotification.success('Tarefa atualizada com sucesso.');
        if(isSaveNew == false) {
          this.router.navigate(['/tasks'])
        } else {
          this.dynamicForm.reset();
        }
        this.isDisabledButton = false;
        this.isLoading = false;
      },
      error => {
        this.poNotification.error('Erro na atualização da tarefa.');
        this.isDisabledButton = false;
        this.isLoading = false;
      }
    );
  }

  setOperation(): void {
    this.operation = this.activatedRoute.snapshot.params['id'] ? 'put' : 'post';
  }

  setTitle(): void {
    if(this.operation == 'put') {
      this.title = 'Editar Tarefa';
      this.customLiterals.saveNew = 'Excluir';
    } else {
      this.title = 'Nova Tarefa';
    }
    this.breadcrumb.items[2].label = this.title;
  }

  saveOrDelete(): void {
    if(this.operation == 'post') {
      this.salvarTarefa(true);
    } else {
      this.confirmDelete();
    }
  }

  confirmDelete(): void {
    this.poDialogService.confirm( {
      title: 'Excluir tarefa',
      message: 'Tem certeza que deseja excluir?',
      confirm: this.excluirTarefa.bind(this)
    })
  }

  excluirTarefa() {
    this.isDisabledButton = true;
    this.isLoading = true;
    this.taskService.deleteTask(this.task).subscribe(
      data => {
        this.isDisabledButton = false;
        this.isLoading = false;
        this.poNotification.success('Tarefa excluída com sucesso.');
        this.router.navigate(['/tasks']);
      },
      error => {
        this.poNotification.error('Erro na exclusão da tarefa.');
        this.isDisabledButton = false;
        this.isLoading = false;
      }
    );
  }

}
