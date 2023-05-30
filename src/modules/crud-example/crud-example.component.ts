import { Component } from '@angular/core';

import { CrudExampleService } from './services/crud-example.service';

@Component({
  selector: 'app-crud-example',
  templateUrl: './crud-example.component.html',
  styleUrls: ['./crud-example.component.scss'],
})
export class CrudExampleComponent {
  constructor(private crudExampleService: CrudExampleService) {}
}
