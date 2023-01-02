import { HttpResponse } from "@application/protocols/http";
import {
  GetPokemonRequest,
  GetPokemonResponse,
  GetPokemonUrlListRequest,
  GetPokemonUrlListResponse,
} from "@domain/usecases/pokemon";

export interface PokemonRepository {
  getPokemonUrlList(
    request: GetPokemonUrlListRequest
  ): Promise<HttpResponse<GetPokemonUrlListResponse>>;

  getPokemon(
    request: GetPokemonRequest
  ): Promise<HttpResponse<GetPokemonResponse>>;
}
