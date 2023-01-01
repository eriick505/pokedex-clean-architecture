import {
  LoadUrlList,
  LoadUrlListRequest,
  LoadUrlListResponse,
} from "@domain/usecases/pokemon";
import { UnexpectedError } from "@domain/errors";

import { HttpClient, HttpStatusCode } from "@application/protocols/http";

import { left } from "@shared/helpers";

export class RemoteLoadUrlList implements LoadUrlList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadUrlListResponse>
  ) {}

  async execute(request: LoadUrlListRequest): Promise<LoadUrlListResponse> {
    const response = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: request.params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.data;
      default:
        return left(new UnexpectedError());
    }
  }
}
