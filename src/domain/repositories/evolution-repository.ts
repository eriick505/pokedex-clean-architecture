import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

export interface EvolutionRepository {
  getEvolutionById(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse>;
}
