import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './components/post/post.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { CrudExampleComponent } from './crud-example.component';

const routes: Routes = [
  {
    path: '',
    component: CrudExampleComponent,
    children: [
      {
        path: 'post', component: PostComponent,
      },
      {
        path: 'post-add', component: PostAddComponent,
      },
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudExampleRoutingModule { }
