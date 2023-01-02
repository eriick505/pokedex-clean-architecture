import {
  GetPokemon,
  GetPokemonRequest,
  GetPokemonResponse,
} from "@domain/usecases/pokemon";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";
import { UnexpectedError } from "@domain/errors";

import { PokemonRepository } from "@application/repositories";
import { HttpStatusCode } from "@application/protocols/http";

import { left } from "@shared/helpers";

export class RemoteGetPokemon implements GetPokemon {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(request: GetPokemonRequest): Promise<GetPokemonResponse> {
    const response = await this.pokemonRepository.getPokemon(request);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.data;
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }
}
