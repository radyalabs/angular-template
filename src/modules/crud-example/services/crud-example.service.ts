import { Injectable, OnInit } from '@angular/core';

import { BaseService } from '@/services/base.service';

import { TodoInterface } from '../interface/todo';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService extends BaseService {
  getTodos(): Promise<TodoInterface[]> {
    return this.get<TodoInterface[]>('/todos');
  }

  getObservableTodos() {
    return this.get$<TodoInterface[]>('todos');
  }
}
