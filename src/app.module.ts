import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { CustomPipeModule } from './pipes/custom.pipes';

export let AppInjector: Injector;
@NgModule({
  declarations: [AppComponent, UnauthorizedComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomPipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
