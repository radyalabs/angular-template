import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpCachingModule } from 'ng-http-caching';

import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { CrudExampleComponent } from './crud-example.component';
import { CrudExampleRoutingModule } from './crud-example-routing.module';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [CrudExampleComponent, ListTodoComponent, TodoComponent],
  imports: [CommonModule, CrudExampleRoutingModule, NgHttpCachingModule],
})
export class CrudExampleModule {}
