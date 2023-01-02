import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";

export interface GetPokemonUrlListRequest {
  limit: number;
}

export type GetPokemonUrlListResponse = Either<UnexpectedError, string[]>;

export interface GetPokemonUrlList {
  execute: (
    request: GetPokemonUrlListRequest
  ) => Promise<GetPokemonUrlListResponse>;
}
