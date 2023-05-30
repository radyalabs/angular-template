import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoInterface } from '../../interface/todo';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent {
  @Input() public data!: TodoInterface[];

  @Input() public data$!: Observable<TodoInterface[]>;

  Array = Array;
}
