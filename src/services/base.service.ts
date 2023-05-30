import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';
import {
  NgHttpCachingConfig,
  NgHttpCachingHeaders,
  NgHttpCachingService,
  NgHttpCachingStrategy,
} from 'ng-http-caching';
import { lastValueFrom, Observable } from 'rxjs';

import { AppInjector } from '@/app.module';
import { environment } from '@/environments/environment';

export interface Foo {
  bar: string;
}

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60, // cache expire after 60 seconds,
  allowedMethod: ['GET', 'HEAD'],
  cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
};

@Injectable({
  providedIn: 'root',
})
export default class BaseService extends NgHttpCachingService {
  serializer = AppInjector.get(UrlSerializer);

  router = AppInjector.get(Router);

  baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) {
    super(ngHttpCachingConfig);
  }

  /**
   * A GET request made by returning httpClient injector Fn as Observable.
   * @params can be passed and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   * ## Example
   *
   * ```ts
   * this.getData$('my-api', {page: 1, row: 10}, crudCachedRequest.TODO_LIST).subscribe({
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
  protected get$<T>(
    url: string,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.get<T>(this.serializeUrl(url, params), {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.get<T>(this.serializeUrl(url, params));
  }

  /**
   * A POST request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   * ## Example
   * Please refer to get$ function
   *
   */
  protected post$<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.post<T>(this.serializeUrl(url, params), body, {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.post<T>(this.serializeUrl(url, params), body);
  }

  /**
   * A PUT request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   * ## Example
   * Please refer to get$ function
   */
  protected put$<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.put<T>(this.serializeUrl(url, params), body, {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.put<T>(this.serializeUrl(url, params), body);
  }

  /**
   * A PATCH request made by returning httpClient injector Fn as Observable.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   * ## Example
   * Please refer to get$ function
   */
  protected patch$<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.patch<T>(this.serializeUrl(url, params), body, {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.patch<T>(this.serializeUrl(url, params), body);
  }

  /**
   * A DELETE request made by returning httpClient injector Fn as Observable.
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   * ## Example
   * Please refer to get$ function
   */
  protected delete$<T>(
    url: string,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.delete<T>(this.serializeUrl(url, params), {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.delete<T>(this.serializeUrl(url, params));
  }

  /**
   * A GET request made by returning httpClient injector Fn as a Promise.
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
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
  protected async get<T>(
    url: string,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Promise<T> {
    if (customCacheTag) {
      return lastValueFrom(
        this.http.get(this.serializeUrl(url, params), {
          headers: {
            [NgHttpCachingHeaders.TAG]: customCacheTag,
            [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
          },
        }),
      ) as Promise<T>;
    }

    return lastValueFrom(
      this.http.get(this.serializeUrl(url, params)),
    ) as Promise<T>;
  }

  /**
   * A POST request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   */
  protected async post<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Promise<T> {
    if (customCacheTag) {
      return lastValueFrom(
        this.http.post(this.serializeUrl(url, params), body, {
          headers: {
            [NgHttpCachingHeaders.TAG]: customCacheTag,
            [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
          },
        }),
      ) as Promise<T>;
    }

    return lastValueFrom(
      this.http.post(this.serializeUrl(url, params), body),
    ) as Promise<T>;
  }

  /**
   * A PUT request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   */
  protected async put<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Promise<T> {
    if (customCacheTag) {
      return lastValueFrom(
        this.http.put(this.serializeUrl(url, params), body, {
          headers: {
            [NgHttpCachingHeaders.TAG]: customCacheTag,
            [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
          },
        }),
      ) as Promise<T>;
    }

    return lastValueFrom(
      this.http.put(this.serializeUrl(url, params), body),
    ) as Promise<T>;
  }

  /**
   * A DELETE request made by returning httpClient injector Fn as a Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   */
  protected async delete<T>(
    url: string,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Promise<T> {
    if (customCacheTag) {
      return lastValueFrom(
        this.http.delete(this.serializeUrl(url, params), {
          headers: {
            [NgHttpCachingHeaders.TAG]: customCacheTag,
            [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
          },
        }),
      ) as Promise<T>;
    }

    return lastValueFrom(
      this.http.delete(this.serializeUrl(url, params)),
    ) as Promise<T>;
  }

  /**
   * A PATCH request made by returning httpClient injector Fn as Promise.
   * @body will be used as request body
   * @params can be used and will be automatically converted to URLencoded with serializer
   * @customCachetTag will be used as a custom tag for cache request, used if you are willing to
   * delete current cached request for making a new request eg. after Add/ Update/ Delete data
   * or fulfilling screnario when you need to get an updated data
   *
   * !! Cached Request by default only allowed for GET and HEAD
   * !! change default config for customization
   *
   */
  protected patch<T>(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>,
    storeCache?: boolean,
    customCacheTag?: string,
  ): Observable<T> {
    if (customCacheTag) {
      return this.http.patch<T>(this.serializeUrl(url, params), body, {
        headers: {
          [NgHttpCachingHeaders.TAG]: customCacheTag,
          [NgHttpCachingHeaders.ALLOW_CACHE]: storeCache ? '1' : '',
        },
      });
    }

    return this.http.patch<T>(this.serializeUrl(url, params), body);
  }

  /**
   * a function which will return URLencoded format from given parameter
   *
   */
  serializeUrl(url: string, queryParams?: Record<string, unknown>): string {
    const urlTree = this.router.createUrlTree([url], {
      queryParams,
    });

    return `${this.baseUrl}${this.serializer.serialize(urlTree)}`;
  }
}
