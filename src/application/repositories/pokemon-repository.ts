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
  ): Promise<GetPokemonNameListResponse>;

  getPokemon(request: GetPokemonRequest): Promise<GetPokemonResponse>;
}
