import {
  GetPokemonById,
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
} from "@domain/usecases/pokemon";

import { PokemonRepository } from "@application/repositories";

export class RemoteGetPokemonById implements GetPokemonById {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetPokemonByIdRequest
  ): Promise<GetPokemonByIdResponse> {
    return await this.pokemonRepository.getPokemonById(request);
  }
}
