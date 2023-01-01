import { Pokemon } from "@domain/entities";

export interface LoadPokemonListRequest {
  limit: number;
}

export type LoadPokemonListResponse = Pokemon[];

export interface LoadPokemonList {
  execute: (
    request: LoadPokemonListRequest
  ) => Promise<LoadPokemonListResponse>;
}
