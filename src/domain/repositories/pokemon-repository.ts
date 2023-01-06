import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/pokemon";

export interface PokemonRepository {
  getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse>;

  getPokemonById(
    request: GetPokemonByIdRequest
  ): Promise<GetPokemonByIdResponse>;

  getEvolutionById(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse>;

  getSpecieById(request: GetSpecieByIdRequest): Promise<GetSpecieByIdResponse>;
}
