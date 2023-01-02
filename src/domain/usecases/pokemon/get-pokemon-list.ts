import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";

export interface LoadPokemonListRequest {
  limit: number;
}

export type LoadPokemonListResponse = Either<UnexpectedError, Pokemon[]>;

export interface LoadPokemonList {
  execute: (
    request: LoadPokemonListRequest
  ) => Promise<LoadPokemonListResponse>;
}
