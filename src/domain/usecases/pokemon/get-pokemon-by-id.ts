import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";

import { Either } from "@shared/helpers";

export interface GetPokemonByIdRequest {
  id: string | number;
}

export type GetPokemonByIdResponse = Either<
  UnexpectedError | PokemonNotFound,
  Pokemon
>;

export interface GetPokemonById {
  execute: (request: GetPokemonByIdRequest) => Promise<GetPokemonByIdResponse>;
}
