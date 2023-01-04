export interface GetPokemonNameListRequest {
  limit: number;
}

export interface GetPokemonRequest {
  id: string | number;
}

export interface PokemonRoutes {
  getPokemonNameList(request: GetPokemonNameListRequest): string;
  getPokemon(request: GetPokemonRequest): string;
}
