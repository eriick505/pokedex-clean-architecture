import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";

export interface LoadUrlListRequest {
  params: {
    limit: number;
  };
}

export type LoadUrlListResponse = Either<UnexpectedError, string[]>;

export interface LoadUrlList {
  execute: (request: LoadUrlListRequest) => Promise<LoadUrlListResponse>;
}
