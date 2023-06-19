import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpCachingModule } from 'ng-http-caching';

import { TableMaterialComponent } from '../../components/table-material/table-material.component';
import { TableComponent } from '../../components/ui/table/table.component';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';
import { PostComponent } from './components/post/post.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { TodoComponent } from './components/todo/todo.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CrudExampleComponent } from './crud-example.component';
import { CrudExampleRoutingModule } from './crud-example-routing.module';

@NgModule({
  declarations: [
    CrudExampleComponent,
    ListTodoComponent,
    TodoComponent,
    PostComponent,
    PostAddComponent,
    UserHomeComponent,
    PeriodicTableComponent,
  ],
  imports: [
    CommonModule,
    CrudExampleRoutingModule,
    NgHttpCachingModule,
    TableComponent,
    TableMaterialComponent,
  ],
})
export class CrudExampleModule {}
