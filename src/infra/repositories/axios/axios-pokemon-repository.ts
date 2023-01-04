import type {
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
  GetPokemonRequest,
  GetPokemonResponse,
} from "@domain/usecases/pokemon";

import { HttpResponse } from "@application/protocols/http";
import { PokemonRepository } from "@application/repositories";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";

export class AxiosPokemonRepository implements PokemonRepository {
  private pokemonRoutes: RemotePokemonRoutes;

  constructor() {
    this.pokemonRoutes = new RemotePokemonRoutes();
  }

  async getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<HttpResponse<GetPokemonNameListResponse>> {
    const axiosClient = new AxiosHttpClient<GetPokemonNameListResponse>();
    const url = this.pokemonRoutes.getPokemonNameList({ limit: request.limit });

    const response = await axiosClient.request({
      method: "get",
      url,
    });

    return response;
  }

  async getPokemon(
    request: GetPokemonRequest
  ): Promise<HttpResponse<GetPokemonResponse>> {
    const axiosClient = new AxiosHttpClient<GetPokemonResponse>();
    const url = this.pokemonRoutes.getPokemon({ id: request.id });

    const response = await axiosClient.request({
      method: "get",
      url,
    });

    return response;
  }
}
