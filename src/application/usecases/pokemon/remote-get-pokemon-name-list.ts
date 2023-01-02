import {
  GetPokemonNameList,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";
import { UnexpectedError } from "@domain/errors";

import { PokemonRepository } from "@application/repositories";
import { HttpStatusCode } from "@application/protocols/http";

import { left } from "@shared/helpers";

export class RemoteGetPokemonNameList implements GetPokemonNameList {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse> {
    const response = await this.pokemonRepository.getPokemonNameList(request);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.data;
      default:
        return left(new UnexpectedError());
    }
  }
}
