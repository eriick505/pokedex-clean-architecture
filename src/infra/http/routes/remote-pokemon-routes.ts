import {
  GetPokemonNameListRequest,
  GetPokemonRequest,
  PokemonRoutes,
} from "@application/routes";

export class RemotePokemonRoutes implements PokemonRoutes {
  getPokemonNameList(request: GetPokemonNameListRequest): string {
    return `/pokemon?limit=${request.limit}&offset=0`;
  }

  getPokemon(request: GetPokemonRequest): string {
    return `pokemon/${request.id}`;
  }
}
