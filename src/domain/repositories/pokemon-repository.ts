import {
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";

import {
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

export interface PokemonRepository {
  getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse>;

  getPokemonById(
    request: GetPokemonByIdRequest
  ): Promise<GetPokemonByIdResponse>;

  getSpecieById(request: GetSpecieByIdRequest): Promise<GetSpecieByIdResponse>;

  getEvolutionById(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse>;
}
