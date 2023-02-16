import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-chevron-right',
  standalone: true,
  imports: [CommonModule],
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-6 h-6" [attr.width]="size" [ngStyle]="iconStyle">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"/>
      </svg>

  `,
})
export class IconChevronRightComponent {
  @Input() title?: string;

  @Input() size = 24;

  @Input() fill = '#000';

  @Input() rotate?: number;

  @Input() margin?: string;

  iconStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: this.margin,
    transform: this.rotate && `rotate(${this.rotate}deg)`,
  };
}
