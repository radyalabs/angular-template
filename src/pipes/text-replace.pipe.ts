import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textReplace',
})
export class TextReplacePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    const exp = new RegExp(args[0], 'g');
    return value.replace(exp, args[1]);
  }
}
