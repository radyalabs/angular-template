import { Injector, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgHttpCachingConfig,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from 'ng-http-caching';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ModifyHeaderInterceptor } from './interceptors/modify-header.interceptor';
import { LoginComponent } from './modules/login/login.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';
import { CustomPipeModule } from './pipes/custom.pipes';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60, // cache expire after 60 seconds,
  allowedMethod: ['GET', 'HEAD'],
  cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
};

// eslint-disable-next-line import/no-mutable-exports
export let AppInjector: Injector;
@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ModifyHeaderInterceptor,
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
