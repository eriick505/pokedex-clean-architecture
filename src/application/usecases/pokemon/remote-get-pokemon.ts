import {
  GetPokemon,
  GetPokemonRequest,
  GetPokemonResponse,
} from "@domain/usecases/pokemon";

import { PokemonRepository } from "@application/repositories";

export class RemoteGetPokemon implements GetPokemon {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(request: GetPokemonRequest): Promise<GetPokemonResponse> {
    return await this.pokemonRepository.getPokemon(request);
  }
}
