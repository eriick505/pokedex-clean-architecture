import {
  GetSpecieById,
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/pokemon";

import { PokemonRepository } from "@domain/repositories";

export class RemoteGetSpecieById implements GetSpecieById {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(request: GetSpecieByIdRequest): Promise<GetSpecieByIdResponse> {
    return await this.pokemonRepository.getSpecieById(request);
  }
}
