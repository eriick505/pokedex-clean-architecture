export interface LoadUrlListRequest {
  limit: number;
}

export type LoadUrlListResponse = string[];

export interface LoadUrlList {
  execute: (request: LoadUrlListRequest) => Promise<LoadUrlListResponse>;
}
