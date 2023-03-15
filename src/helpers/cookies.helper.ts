import { StorageTypes } from '@/types/storage-types';

const ObjToString = (data: StorageTypes): string => `${data.key}=${data.value}`;

export const getCookies = (cookieName?: string): string => {
  const cookies = document.cookie;
  const splitted = cookies
    .split(';')
    .map((value) => value.split('=').map((data) => data.trim()));
  let res = '';

  splitted.forEach((value) => {
    if (value[0] === cookieName) {
      const [, suffix] = value;
      res = suffix;
    }
  });

  return cookieName ? res : cookies;
};

export const setCookies = (
  dataPair: StorageTypes | StorageTypes[],
  expires: Date,
  isSecure: boolean,
  samesite: 'lax' | 'strict',
) => {
  const expiresDate = new Date(expires).toUTCString();

  if (Array.isArray(dataPair)) {
    dataPair.forEach((value) => {
      document.cookie = `${ObjToString(value)};expires=${expiresDate};${
        isSecure ? 'secure;' : ''
      }samesite=${samesite}`;
    });
  } else {
    document.cookie = `${ObjToString(dataPair)};expires=${expiresDate};${
      isSecure ? 'secure;' : ''
    }samesite=${samesite}`;
  }
};

export const deleteCookies = (name: string | string[]) => {
  if (Array.isArray(name)) {
    name.forEach((keyName: string) => {
      document.cookie = `${keyName}=;Max-Age=0`;
    });
  } else {
    document.cookie = `${name}=;Max-Age=0`;
  }
};
