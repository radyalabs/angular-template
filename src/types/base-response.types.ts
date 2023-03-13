export interface BaseResponse<T> {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  errorCode: boolean;
  path: string;
  payload: T;
}
