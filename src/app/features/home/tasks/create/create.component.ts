import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild('formCriarTarefa') formCriarTarefa!: NgForm;

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Tarefas' }
    ]
  };
  camposFormularioCriar: Array<PoDynamicFormField> = [
    { property: 'description', label: 'Descrição', placeholder: 'Digite a descrição', required: true, clean: true, minLength: 4, maxLength: 50, gridColumns: 12, gridSmColumns: 12 },
    { property: 'dueDate', label: 'Data de Conclusão', placeholder: 'Informe a data de conclusão', type: 'date', format: 'dd/mm/yyyy', required: true, clean: true, gridColumns: 12, gridSmColumns: 12 }
  ];
  dynamicFormCriar!: NgForm;
  isDisabledButton: boolean = false;
  isLoading: boolean = false;
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

  cancelarCriarTarefa() {
    this.router.navigate(['/tasks']);
  }

  criarTarefa(isSaveNew: boolean) {
    if (this.dynamicFormCriar.form.invalid) {
      this.poNotification.warning('Preencha as informações.');
    } else {
      this.isDisabledButton = true;
      this.isLoading = true;
      this.task = this.dynamicFormCriar.form.getRawValue();
      this.task = {
        ...this.task,
        finished: false
      }
      this.taskService.addTask(this.task).subscribe(
        data => {
          this.poNotification.success('Tarefa criada com sucesso.');
          if(isSaveNew == false) {
            this.router.navigate(['/tasks'])
          } else {
            this.dynamicFormCriar.reset();
          }
          this.isDisabledButton = false;
          this.isLoading = false;
        },
        error => {
          this.poNotification.success('Erro na criação da tarefa.');
          this.isDisabledButton = false;
          this.isLoading = false;
        }
      );
    }
  }

  getFormCriar(form: NgForm) {
    this.dynamicFormCriar = form;
  }

}
