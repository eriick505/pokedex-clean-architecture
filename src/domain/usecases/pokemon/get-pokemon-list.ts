import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";

export interface GetPokemonListRequest {
  limit: number;
}

export type GetPokemonListResponse = Either<UnexpectedError, Pokemon[]>;

export interface GetPokemonList {
  execute: (request: GetPokemonListRequest) => Promise<GetPokemonListResponse>;
}
