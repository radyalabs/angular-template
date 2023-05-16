import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-menu-open',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-tzssek-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuOpenIcon" [attr.width]="size" [ngStyle]="iconStyle"><path fill="#ffffff" d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"></path></svg>`,
})
export class IconMenuOpenComponent {
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
