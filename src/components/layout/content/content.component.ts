import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from '@/services/layout.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
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
