import {
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";

export interface PokemonRepository {
  getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse>;

  getPokemonById(
    request: GetPokemonByIdRequest
  ): Promise<GetPokemonByIdResponse>;
}
