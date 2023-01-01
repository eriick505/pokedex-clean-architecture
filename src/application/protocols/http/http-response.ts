import { HttpStatusCode } from "./http-status-code";

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  data: T;
}
