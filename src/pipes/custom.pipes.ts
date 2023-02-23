import { NgModule } from '@angular/core';
import { TextReplacePipe } from './text-replace.pipe';

@NgModule({
  declarations: [TextReplacePipe],
  exports: [TextReplacePipe],
})
export class CustomPipeModule {}
