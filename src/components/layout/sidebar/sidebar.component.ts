import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconArrowRoundedComponent } from '@/components/icons/icon-arrow-rounded.component';
import { IconBookComponent } from '@/components/icons/icon-book.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, IconBookComponent, IconArrowRoundedComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isCollapsed = false;
}
