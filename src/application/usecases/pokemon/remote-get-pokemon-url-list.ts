import {
  GetPokemonUrlList,
  GetPokemonUrlListRequest,
  GetPokemonUrlListResponse,
} from "@domain/usecases/pokemon";
import { UnexpectedError } from "@domain/errors";

import { PokemonRepository } from "@application/repositories";
import { HttpStatusCode } from "@application/protocols/http";

import { left } from "@shared/helpers";

export class RemoteGetPokemonUrlList implements GetPokemonUrlList {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetPokemonUrlListRequest
  ): Promise<GetPokemonUrlListResponse> {
    const response = await this.pokemonRepository.getPokemonUrlList(request);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.data;
      default:
        return left(new UnexpectedError());
    }
  }
}
