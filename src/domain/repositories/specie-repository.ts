import {
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

export interface SpecieRepository {
  getSpecieById(request: GetSpecieByIdRequest): Promise<GetSpecieByIdResponse>;
}
