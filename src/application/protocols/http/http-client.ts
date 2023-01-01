import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export interface HttpClient<R> {
  request: (req: HttpRequest) => Promise<HttpResponse<R>>;
}
