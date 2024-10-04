export interface ResponseCustom<T> {
  data: Error | T;
  status: number;
}

interface Error {
  message: string;
}
