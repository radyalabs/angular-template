import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';
import { PostComponent } from './components/post/post.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CrudExampleComponent } from './crud-example.component';

const routes: Routes = [
  {
    path: '',
    component: CrudExampleComponent,
    children: [
      {
        path: 'user',
        component: UserHomeComponent,
      },
      {
        path: 'periodic-table',
        component: PeriodicTableComponent,
      },
      {
        path: 'post',
        component: PostComponent,
      },
      {
        path: 'post-add',
        component: PostAddComponent,
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudExampleRoutingModule {}
