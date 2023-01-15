import {
  RepoGetEvolutionByIdRequest,
  RepoGetEvolutionByIdResponse,
  RepoGetPokemonByIdRequest,
  RepoGetPokemonByIdResponse,
  RepoGetPokemonNameListRequest,
  RepoGetPokemonNameListResponse,
  RepoGetSpecieByIdRequest,
  RepoGetSpecieByIdResponse,
} from "./interfaces/pokemon-repository.interfaces";

export interface PokemonRepository {
  getPokemonNameList(
    request: RepoGetPokemonNameListRequest
  ): Promise<RepoGetPokemonNameListResponse>;

  getPokemonById(
    request: RepoGetPokemonByIdRequest
  ): Promise<RepoGetPokemonByIdResponse>;

  getSpecieById(
    request: RepoGetSpecieByIdRequest
  ): Promise<RepoGetSpecieByIdResponse>;

  getEvolutionById(
    request: RepoGetEvolutionByIdRequest
  ): Promise<RepoGetEvolutionByIdResponse>;
}
