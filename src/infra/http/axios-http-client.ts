import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@application/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient<T> implements HttpClient<T> {
  async request(req: HttpRequest): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse = {} as AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: req.url,
        method: req.method,
        data: req.body,
        headers: req.headers,
        params: req.params,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        axiosResponse = err.response;
      }
    }

    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data,
    };
  }
}
