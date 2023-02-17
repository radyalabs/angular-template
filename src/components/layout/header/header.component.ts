import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconChevronLeftComponent } from '@/components/icons/icon-chevron-left.component';
import { IconChevronRightComponent } from '@/components/icons/icon-chevron-right.component';
import { LayoutService } from '@/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconChevronRightComponent, IconChevronLeftComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private layoutService: LayoutService,
  ) { }

  ngOnInit() {
    this.layoutService.collapsedState.subscribe((state) => {
      this.isCollapsed = state;
    });
  }

  onToggleCollapsed() {
    this.layoutService.toggleCollapse(!this.isCollapsed);
  }
}
