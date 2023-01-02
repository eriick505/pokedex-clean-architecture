import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";

export interface GetPokemonNameListRequest {
  limit: number;
}

export type GetPokemonNameListResponse = Either<UnexpectedError, string[]>;

export interface GetPokemonNameList {
  execute: (
    request: GetPokemonNameListRequest
  ) => Promise<GetPokemonNameListResponse>;
}
