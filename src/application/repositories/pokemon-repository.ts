import { HttpResponse } from "@application/protocols/http";
import {
  GetPokemonRequest,
  GetPokemonResponse,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";

export interface PokemonRepository {
  getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<HttpResponse<GetPokemonNameListResponse>>;

  getPokemon(
    request: GetPokemonRequest
  ): Promise<HttpResponse<GetPokemonResponse>>;
}
