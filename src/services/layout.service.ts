import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LayoutService {
  private collapsedSubject = new Subject<boolean>();

  collapsedState = this.collapsedSubject.asObservable();

  toggleCollapse(nextState: boolean) {
    this.collapsedSubject.next(nextState);
  }
}
