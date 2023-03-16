import {
  Directive, ElementRef, HostListener, Input,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input() highlightBackground = 'green';

  @HostListener('mouseenter') onMouseEnter() {
    this.hightlight(this.highlightBackground);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hightlight('');
  }

  hightlight(highlightBackground: string) {
    this.el.nativeElement.style.backgroundColor = highlightBackground;
  }
}
