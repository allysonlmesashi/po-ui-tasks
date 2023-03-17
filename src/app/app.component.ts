import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Tarefas', link: '/tasks', icon: "po-icon-device-desktop", shortLabel: 'Tarefas' }
  ];

}
