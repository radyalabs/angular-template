import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private snackbar: MatSnackBar,
  ) { }

  create(message: string, confirmAction: string, snackbarConfig?: MatSnackBarConfig) {
    this.snackbar.open(message, confirmAction, snackbarConfig);
  }

  createCallback(
    message: string,
    confirmAction: string,
    action: () => void,
    snackbarConfig?: MatSnackBarConfig,
  ) {
    const snackbarInstance = this.snackbar.open(message, confirmAction, snackbarConfig);
    snackbarInstance.afterDismissed().subscribe({
      next: () => {
        action();
      },
    }).unsubscribe();
  }

  createFromComponent(
    component: ComponentType<unknown>,
    snackbarConfig?: MatSnackBarConfig,
    action?: () => void,
  ) {
    const snackbarInstance = this.snackbar.openFromComponent(component, snackbarConfig);
    snackbarInstance.afterDismissed().subscribe({
      next: () => {
        if (action) {
          action();
        }
      },
    }).unsubscribe();
  }

  dismiss() {
    this.snackbar.dismiss();
  }
}
