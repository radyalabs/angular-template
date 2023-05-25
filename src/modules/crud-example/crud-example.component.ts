import { Component, OnInit } from '@angular/core';
import { map,Observable } from 'rxjs';

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

  constructor(
    private crudExampleService: CrudExampleService,
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getPosts$();
  }

  async getPosts() {
    const response = await this.crudExampleService.getTodos();
    if (!Array.isArray(response)) {
      return;
    }

    this.listTodo = response.slice(0, 15);
  }

  getPosts$() {
    this.listTodo$ = this.crudExampleService.getObservableTodos().pipe(
      map((value) => value.splice(0, 10)),
    );
  }
}
