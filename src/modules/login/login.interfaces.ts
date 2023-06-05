export interface LoginResponse {
  userId: string;
  expiry: number;
  accessToken: string;
  refreshToken: string;
}
