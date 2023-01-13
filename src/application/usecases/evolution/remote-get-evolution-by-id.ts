import {
  GetEvolutionById,
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

import { EvolutionRepository } from "@domain/repositories";

export class RemoteGetEvolutionById implements GetEvolutionById {
  constructor(private readonly evolutionRepository: EvolutionRepository) {}

  async execute(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse> {
    return await this.evolutionRepository.getEvolutionById(request);
  }
}
