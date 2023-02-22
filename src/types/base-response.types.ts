export interface BaseResponse<T> {
  alert: AlertResponse;
  data: T;
}

export interface AlertResponse {
  code: string;
  message: string;
  inner_message: string;
}
