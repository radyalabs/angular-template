import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-menu-close',
  standalone: true,
  imports: [CommonModule],
  template: `
  <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-tzssek-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon" [attr.width]="size" [ngStyle]="iconStyle"><path fill="#ffffff" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
  `,
})
export class IconMenuCloseComponent {
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
