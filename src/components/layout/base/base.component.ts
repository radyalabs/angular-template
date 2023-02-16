import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ContentComponent } from '@/components/layout/content/content.component';
import { HeaderComponent } from '@/components/layout/header/header.component';
import { SidebarComponent } from '@/components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, ContentComponent, RouterOutlet],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],

})
export class BaseComponent {
  isCollapsed = false;

  onToggleCollapsed(value: boolean) {
    this.isCollapsed = value;
  }
}
