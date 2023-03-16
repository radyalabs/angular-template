import { StorageTypes } from '@/types/storage-types';

export const getLocalStorageKeys = (key: string | string[]): string | string[] => {
  if (Array.isArray(key)) {
    const values: string[] = [];
    key.forEach((keyName) => {
      values.push(localStorage.getItem(keyName) || '');
    });
    return values;
  }
  return localStorage.getItem(key) || '';
};

export const storeLocalStorageKeys = (dataPair: StorageTypes | StorageTypes[]): void => {
  if (Array.isArray(dataPair)) {
    dataPair.forEach((data) => {
      localStorage.setItem(data.key, data.value);
    });
  } else {
    localStorage.setItem(dataPair.key, dataPair.value);
  }
};
