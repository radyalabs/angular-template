import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpCachingModule } from 'ng-http-caching';

import { CrudExampleComponent } from './crud-example.component';
import { CrudExampleRoutingModule } from './crud-example-routing.module';

@NgModule({
  declarations: [CrudExampleComponent],
  imports: [CommonModule, CrudExampleRoutingModule, NgHttpCachingModule],
})
export class CrudExampleModule {}
