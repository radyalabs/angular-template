import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { BaseComponent } from '@/components/layout/base/base.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'protected',
    loadChildren: () =>
      import('./modules/protected/protected.module').then(
        (m) => m.ProtectedModule
      ),
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
