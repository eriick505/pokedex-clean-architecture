import { Spiecie } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";
import { SpecieNotFound } from "@domain/usecases/pokemon/errors";

import { Either } from "@shared/helpers";

export interface GetSpecieByIdRequest {
  id: string | number;
}

export type GetSpecieByIdResponse = Either<
  UnexpectedError | SpecieNotFound,
  Spiecie
>;

export interface GetSpecieById {
  execute: (request: GetSpecieByIdRequest) => Promise<GetSpecieByIdResponse>;
}
