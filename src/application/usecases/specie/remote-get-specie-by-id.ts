import {
  GetSpecieById,
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

import { SpecieRepository } from "@domain/repositories";

export class RemoteGetSpecieById implements GetSpecieById {
  constructor(private readonly specieRepository: SpecieRepository) {}

  async execute(request: GetSpecieByIdRequest): Promise<GetSpecieByIdResponse> {
    return await this.specieRepository.getSpecieById(request);
  }
}
