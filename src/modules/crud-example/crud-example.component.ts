import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { CrudCacheRequest } from './enums/crud-enum';
import { TodoInterface } from './interface/todo';
import { CrudExampleService } from './services/crud-example.service';

@Component({
  selector: 'app-crud-example',
  templateUrl: './crud-example.component.html',
  styleUrls: ['./crud-example.component.scss'],
})
export class CrudExampleComponent implements OnInit {
  listTodo: TodoInterface[] = [];

  listTodo$ = new Observable<TodoInterface[]>();

  constructor(private crudExampleService: CrudExampleService) {}

  ngOnInit(): void {
    this.getPosts();
    // this.getPosts$();
  }

  async getPosts() {
    const response = await this.crudExampleService.getTodos();
    if (!Array.isArray(response)) {
      return;
    }

    this.listTodo = response.slice(0, 15);
  }

  getPosts$() {
    this.listTodo$ = this.crudExampleService
      .getObservableTodos()
      .pipe(map((data) => data.slice(0, 5)));
  }

  cleanCache() {
    this.crudExampleService.clearCacheByTag(CrudCacheRequest.LIST_TODO);
    // eslint-disable-next-line no-alert
    alert('Selected active request cache is deleted and a new request will be sent');
  }
}
