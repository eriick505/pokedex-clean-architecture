import {
  GetEvolutionById,
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

import { PokemonRepository } from "@domain/repositories";

export class RemoteGetEvolutionById implements GetEvolutionById {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse> {
    return await this.pokemonRepository.getEvolutionById(request);
  }
}
