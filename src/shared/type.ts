export interface BaseResponse<T> {
  data: T;
  message: string;
  status: boolean;
  statusCode: number;
}
