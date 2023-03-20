import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => this.router.navigate(['']), icon: "po-icon-home", shortLabel: 'Home' },
    { label: 'Tarefas', action: () => this.router.navigate(['tasks']), icon: "po-icon-device-desktop", shortLabel: 'Tarefas' }
  ];

}
