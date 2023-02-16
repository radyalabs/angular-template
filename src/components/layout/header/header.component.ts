import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconChevronLeftComponent } from '@/components/icons/icon-chevron-left.component';
import { IconChevronRightComponent } from '@/components/icons/icon-chevron-right.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconChevronRightComponent, IconChevronLeftComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isCollapsed = false;

  @Output() toggleCollapsed: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggleCollapsed() {
    this.toggleCollapsed.emit(!this.isCollapsed);
  }
}
