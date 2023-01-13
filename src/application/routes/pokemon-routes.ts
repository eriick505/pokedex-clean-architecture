export interface GetPokemonNameListRequest {
  limit: number;
}

export interface GetPokemonByIdRequest {
  id: string | number;
}

export interface GetSpecieByIdRequest {
  id: string | number;
}

export interface GetEvolutionByIdRequest {
  id: string | number;
}

export interface PokemonRoutes {
  getPokemonNameList(request: GetPokemonNameListRequest): string;
  getPokemonById(request: GetPokemonByIdRequest): string;
  getSpecieById(request: GetSpecieByIdRequest): string;
  getEvolutionById(request: GetEvolutionByIdRequest): string;
}
