import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconArrowRoundedComponent } from '@/components/icons/icon-arrow-rounded.component';
import { IconBookComponent } from '@/components/icons/icon-book.component';
import { LayoutService } from '@/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, IconBookComponent, IconArrowRoundedComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private layoutService: LayoutService,
  ) { }

  ngOnInit() {
    this.layoutService.collapsedState.subscribe((state) => {
      this.isCollapsed = state;
    });
  }
}
