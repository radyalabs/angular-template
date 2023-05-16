import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconMenuCloseComponent } from '@/components/icons/icon-menu-close.component';
import { IconMenuOpenComponent } from '@/components/icons/icon-menu-open.component';
import { LayoutService } from '@/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule, IconMenuOpenComponent,
    IconMenuCloseComponent,
  ],
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
