import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";
import { FailToGetAllPokemons } from "@domain/usecases/pokemon/errors";

export interface GetPokemonListRequest {
  limit: number;
}

export type GetPokemonListResponse = Either<
  UnexpectedError | FailToGetAllPokemons,
  Pokemon[]
>;

export interface GetPokemonList {
  execute: (request: GetPokemonListRequest) => Promise<GetPokemonListResponse>;
}
