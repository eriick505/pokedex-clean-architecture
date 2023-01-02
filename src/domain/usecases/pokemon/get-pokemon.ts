import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { Either } from "@shared/helpers";
import { PokemonNotFound } from "./errors/pokemon-not-found";

export interface GetPokemonRequest {
  id: string | number;
}

export type GetPokemonResponse = Either<
  UnexpectedError | PokemonNotFound,
  Pokemon
>;

export interface GetPokemon {
  execute: (request: GetPokemonRequest) => Promise<GetPokemonResponse>;
}
