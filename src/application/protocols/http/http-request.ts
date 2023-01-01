import { HttpMethod } from "./http-method";

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  params?: any;
}
