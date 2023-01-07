import { Evolution } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import {
  EvolutionNotFound,
  HasNoEvolution,
} from "@domain/usecases/evolution/errors";

import { Either } from "@shared/helpers";

export interface GetEvolutionByIdRequest {
  id: string | number;
}

export type GetEvolutionByIdResponse = Either<
  UnexpectedError | EvolutionNotFound,
  HasNoEvolution | Evolution
>;

export interface GetEvolutionById {
  execute: (
    request: GetEvolutionByIdRequest
  ) => Promise<GetEvolutionByIdResponse>;
}
