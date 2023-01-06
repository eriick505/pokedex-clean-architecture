import {
  GetPokemonNameListRequest,
  GetPokemonByIdRequest,
  PokemonRoutes,
  GetSpecieByIdRequest,
} from "@application/routes";
import { makeApiUrl } from "@infra/factories/http";

export class RemotePokemonRoutes implements PokemonRoutes {
  getPokemonNameList(request: GetPokemonNameListRequest): string {
    return makeApiUrl(`/pokemon?limit=${request.limit}&offset=0`);
  }

  getPokemonById(request: GetPokemonByIdRequest): string {
    return makeApiUrl(`pokemon/${request.id}`);
  }

  getSpecieById(request: GetSpecieByIdRequest): string {
    return makeApiUrl(`pokemon-species/${request.id}`);
  }
}
