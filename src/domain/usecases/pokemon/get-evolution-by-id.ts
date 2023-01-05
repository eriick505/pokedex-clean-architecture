import { Evolution } from "@domain/entities/pokemon/value-objects";
import { UnexpectedError } from "@domain/errors";

import { Either } from "@shared/helpers";

export interface GetEvolutionByIdRequest {
  id: string | number;
}

export type GetEvolutionByIdResponse = Either<
  UnexpectedError | [],
  Evolution[]
>;

export interface GetEvolutionById {
  execute: (
    request: GetEvolutionByIdRequest
  ) => Promise<GetEvolutionByIdResponse>;
}
