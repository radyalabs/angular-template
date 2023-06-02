import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule],
})
export class TableComponent implements OnInit {
  @Input() tableColumn: { colName: string; activeSort: boolean }[] = [
    {
      colName: 'First',
      activeSort: true,
    },
    {
      colName: 'Seconds',
      activeSort: true,
    },
  ];

  @Input() tableData: {
    firstProps: string;
    secondsProps: string;
    action: {
      actionName: string;
      actionClass: string;
      function: () => void;
    }[];
  }[] = [
      {
        firstProps: 'Mark',
        secondsProps: 'Otto',
        action: [
          {
            actionName: 'Edit',
            actionClass: 'bg-blue-950 text-white',
            function: () => {
            // eslint-disable-next-line no-console
              console.log('click edit Mark');
            },
          },
          {
            actionName: 'Delete',
            actionClass: 'bg-red-950 text-white',
            function: () => {
            // eslint-disable-next-line no-console
              console.log('click delete Mark');
            },
          },
        ],
      },
    ];

  @Input() footerActions: {
    actionName: string;
    actionClass: string;
    function: () => void;
  }[] = [];

  @Input() withAction = true;

  activeSortFirst = false;

  activeSortLast = false;

  activeSortAction = false;

  currentSortedColumn: {
    colName: string;
    sortType: 'asc' | 'desc' | '';
  } = {
      colName: '',
      sortType: '',
    };

  ngOnInit(): void {}

  bindSortedColumn(colName: string) {
    // eslint-disable-next-line no-console
    console.log(this.currentSortedColumn);

    if (
      this.currentSortedColumn.colName === ''
      || this.currentSortedColumn.colName !== colName
    ) {
      this.currentSortedColumn.colName = colName;
      this.currentSortedColumn.sortType = 'asc';
      return;
    }

    if (this.currentSortedColumn.sortType === 'asc') {
      this.currentSortedColumn.sortType = 'desc';
      return;
    }

    if (this.currentSortedColumn.sortType === 'desc') {
      this.currentSortedColumn.colName = '';
      this.currentSortedColumn.sortType = '';
    }
  }
}
