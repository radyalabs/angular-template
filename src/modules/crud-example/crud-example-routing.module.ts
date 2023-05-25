import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudExampleComponent } from './crud-example.component';

const routes: Routes = [{ path: '', component: CrudExampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudExampleRoutingModule { }
