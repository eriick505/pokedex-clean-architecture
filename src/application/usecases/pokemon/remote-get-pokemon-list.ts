import {
  GetPokemonList,
  GetPokemonListRequest,
  GetPokemonListResponse,
} from "@domain/usecases/pokemon";
import { Pokemon } from "@domain/entities";

import { PokemonRepository } from "@domain/repositories";
import {
  RemoteGetPokemonById,
  RemoteGetPokemonNameList,
} from "@application/usecases/pokemon";

import { left, right } from "@shared/helpers";
import { FailToGetAllPokemons } from "@domain/usecases/pokemon/errors";

export class RemoteGetPokemonList implements GetPokemonList {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(
    request: GetPokemonListRequest
  ): Promise<GetPokemonListResponse> {
    try {
      const getPokemonNameList = new RemoteGetPokemonNameList(
        this.pokemonRepository
      );

      const pokemonNameListOrError = await getPokemonNameList.execute({
        limit: request.limit,
      });

      if (pokemonNameListOrError.isLeft()) {
        return left(pokemonNameListOrError.value);
      }

      const pokemonNameList = pokemonNameListOrError.value;

      const getPokemon = new RemoteGetPokemonById(this.pokemonRepository);

      const handleGetPokemon = async (id: string) => {
        const pokemonOrError = await getPokemon.execute({ id });

        if (pokemonOrError.isLeft()) return;

        return pokemonOrError.value;
      };

      const pokemonList = await Promise.all(
        pokemonNameList.map(handleGetPokemon)
      );

      return right(pokemonList);
    } catch (error) {
      throw left(new FailToGetAllPokemons());
    }
  }
}
