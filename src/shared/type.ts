export interface BaseResponse<T> {
  data: T;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface BaseInfiniteResponse<T> {
  data: {
    data: T[];
    nextCursor: number;
    hasNext: boolean;
  };
  message: string;
  status: boolean;
  statusCode: number;
}
