import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpCachingModule } from 'ng-http-caching';

import { TableComponent } from '../../components/ui/table/table.component';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { PostComponent } from './components/post/post.component';
import { TodoComponent } from './components/todo/todo.component';
import { CrudExampleComponent } from './crud-example.component';
import { CrudExampleRoutingModule } from './crud-example-routing.module';
import { PostAddComponent } from './components/post-add/post-add.component';

@NgModule({
  declarations: [CrudExampleComponent, ListTodoComponent, TodoComponent, PostComponent, PostAddComponent],
  imports: [CommonModule, CrudExampleRoutingModule, NgHttpCachingModule, TableComponent],
})
export class CrudExampleModule {}
