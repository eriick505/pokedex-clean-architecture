import { Specie } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { SpecieNotFound } from "@domain/usecases/specie/errors";

import { Either } from "@shared/helpers";

export interface GetSpecieByIdRequest {
  id: string | number;
}

export type GetSpecieByIdResponse = Either<
  UnexpectedError | SpecieNotFound,
  Specie
>;

export interface GetSpecieById {
  execute: (request: GetSpecieByIdRequest) => Promise<GetSpecieByIdResponse>;
}
