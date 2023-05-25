import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudExampleRoutingModule } from './crud-example-routing.module';
import { CrudExampleComponent } from './crud-example.component';


@NgModule({
  declarations: [
    CrudExampleComponent
  ],
  imports: [
    CommonModule,
    CrudExampleRoutingModule
  ]
})
export class CrudExampleModule { }
