import { StorageTypes } from '@/types/storage-types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookies(cookieName?: string): string {
    const cookies = document.cookie;
    const splitted = cookies
      .split(';')
      .map((value) => value.split('=').map((value) => value.trim()));
    let res = '';

    splitted.forEach((value) => {
      if (value[0] === cookieName) {
        res = value[1];
      }
    });

    return cookieName ? res : cookies;
  }

  setCookies(
    dataPair: StorageTypes | StorageTypes[],
    expires: Date,
    isSecure: boolean,
    samesite: 'lax' | 'strict'
  ) {
    const _expires = new Date(expires).toUTCString();

    if (Array.isArray(dataPair)) {
      dataPair.forEach((value) => {
        document.cookie = `${this.ObjToString(value)};expires=${_expires};${
          isSecure ? 'secure;' : ''
        }samesite=${samesite}`;
      });
    } else {
      document.cookie = `${this.ObjToString(dataPair)};expires=${_expires};${
        isSecure ? 'secure;' : ''
      }samesite=${samesite}`;
    }
  }

  deleteCookies(name: string | string[]) {
    if (Array.isArray(name)) {
      name.forEach((keyName: string) => {
        document.cookie = `${keyName}=;Max-Age=0`;
      });
    } else {
      document.cookie = `${name}=;Max-Age=0`;
    }
  }

  private ObjToString(data: StorageTypes): string {
    return `${data.key}=${data.value}`;
  }

  private ArrToString(datas: StorageTypes[]): string {
    const instanceArray = [];

    for (const data of datas) {
      instanceArray.push(this.ObjToString(data));
    }

    return instanceArray.join(';');
  }
}
