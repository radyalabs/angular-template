import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { BaseResponse } from '@/types/base-response.types';
import { environment } from '@/environments/environment';
import { AppInjector } from '@/app.module';
import { Router, UrlSerializer } from '@angular/router';

export interface Foo {
  bar: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  serializer = AppInjector.get(UrlSerializer);
  router = AppInjector.get(Router);
  baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) {}

  /**
   * A GET request made by returning httpClient injector Fn as Observable.
   * @params can be passed and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   *
   * ```ts
   * this.getData$('my-api', {page: 1, row: 10}).subscribe({
   *   next: (value) => {
   *      console.log({value})
   *   },
   *   error: (error) => {
   *      console.error({error})
   *   },
   *   complete: () => {
   *      console.info('complete')
   *   }
   * });
   *
   * ```
   * Anyway this handler can be replace with errorHandler which was
   * declared in request.helper.ts for general handling strategy
   *
   */
  protected get$<T>(url: string, params?: any): Observable<BaseResponse<T>> {
    return this.http.get<BaseResponse<T>>(this.serializeUrl(url, params));
  }

  /**
   * A POST request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   * Please refer to get$ function
   *
   */
  protected post$<T>(
    url: string,
    body: any,
    params?: any
  ): Observable<BaseResponse<T>> {
    return this.http.post<BaseResponse<T>>(
      this.serializeUrl(url, params),
      body
    );
  }

  /**
   * A PUT request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   * Please refer to get$ function
   */
  protected put$<T>(
    url: string,
    body: any,
    params?: any
  ): Observable<BaseResponse<T>> {
    return this.http.put<BaseResponse<T>>(this.serializeUrl(url, params), body);
  }

  /**
   * A PATCH request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   * Please refer to get$ function
   */
  protected patch$<T>(
    url: string,
    body: any,
    params: any
  ): Observable<BaseResponse<T>> {
    return this.http.patch<BaseResponse<T>>(
      this.serializeUrl(url, params),
      body
    );
  }

  /**
   * A DELETE request made by returning httpClient injector Fn as Observable.
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   * Please refer to get$ function
   */
  protected delete$<T>(url: string, params?: any): Observable<BaseResponse<T>> {
    return this.http.delete<BaseResponse<T>>(this.serializeUrl(url, params));
  }

  /**
   * A GET request made by returning httpClient injector Fn as a Promise.
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   * ## Example
   * ```ts
   * async getDataUser () {
   *    const { alert, data } = await this.getData$('my-api', {page: 1, row: 10})
   *    // Do something
   * }
   *
   * ```
   */
  protected async get<T>(url: string, params?: any): Promise<BaseResponse<T>> {
    return lastValueFrom(
      this.http.get(this.serializeUrl(url, params))
    ) as Promise<BaseResponse<T>>;
  }

  /**
   * A POST request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   */
  protected async post<T>(
    url: string,
    body: any,
    params?: any
  ): Promise<BaseResponse<T>> {
    return lastValueFrom(
      this.http.post(this.serializeUrl(url, params), body)
    ) as Promise<BaseResponse<T>>;
  }

  /**
   * A PUT request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   */
  protected async put<T>(
    url: string,
    body: any,
    params?: any
  ): Promise<BaseResponse<T>> {
    return lastValueFrom(
      this.http.put(this.serializeUrl(url, params), body)
    ) as Promise<BaseResponse<T>>;
  }

  /**
   * A DELETE request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   */
  protected async delete<T>(
    url: string,
    params?: any
  ): Promise<BaseResponse<T>> {
    return lastValueFrom(
      this.http.delete(this.serializeUrl(url, params))
    ) as Promise<BaseResponse<T>>;
  }

  /**
   * A PATCH request made by returning httpClient injector Fn as Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   *
   */
  protected patch<T>(
    url: string,
    body: any,
    params: any
  ): Observable<BaseResponse<T>> {
    return this.http.patch<BaseResponse<T>>(
      this.serializeUrl(url, params),
      body
    );
  }

  /**
   * a function which will return URLencoded format from given parameter
   *
   */
  serializeUrl(url: string, queryParams: any): string {
    const urlTree = this.router.createUrlTree([url], {
      queryParams: queryParams,
    });
    return `${this.baseUrl}${this.serializer.serialize(urlTree)}`;
  }
}
