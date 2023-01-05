import type {
  GetPokemonNameList,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";

import { PokemonRepository } from "@domain/repositories";

export class RemoteGetPokemonNameList implements GetPokemonNameList {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse> {
    return await this.pokemonRepository.getPokemonNameList(request);
  }
}
