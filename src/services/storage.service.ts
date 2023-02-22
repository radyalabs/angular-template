import { StorageTypes } from '@/types/storage-types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getKeys(key: string | string[]): string | string[] {
    if (Array.isArray(key)) {
      const values: string[] = [];
      key.forEach((keyName) => {
        values.push(localStorage.getItem(keyName) || '');
      });
      return values;
    } else {
      return localStorage.getItem(key) || '';
    }
  }

  storeKeys(dataPair: StorageTypes | StorageTypes[]): void {
    if (Array.isArray(dataPair)) {
      dataPair.forEach((data) => {
        localStorage.setItem(data.key, data.value);
      });
      return;
    } else {
      localStorage.setItem(dataPair.key, dataPair.value);
      return;
    }
  }
}
