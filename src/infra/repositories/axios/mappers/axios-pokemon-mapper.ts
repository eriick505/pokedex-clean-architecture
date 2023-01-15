import { Pokemon, Evolution } from "@domain/entities";
import { RawEvolution, RawPokemon } from "@infra/repositories/axios/model";

export class AxiosPokemonMapper {
  static toDomain(pokemonRaw: RawPokemon, evolutions: Evolution[]): Pokemon {
    const {
      types,
      moves,
      stats,
      abilities,
      sprites,
      name,
      height,
      weight,
      id,
    } = pokemonRaw;

    const pokemonTypes = types.map((t) => t.type);
    const pokemonMoves = moves.map((m) => m.move);

    const pokemonStats = stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    }));

    const pokemonAbilities = abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    }));

    const pokemonSprites = {
      frontDefault: sprites.front_default,
      artWorkFront: sprites.other["official-artwork"].front_default,
      dreamWorldFront: sprites.other.dream_world.front_default,
    };

    const pokemonOrError = Pokemon.create(
      {
        name: name,
        types: pokemonTypes,
        moves: pokemonMoves,
        stats: pokemonStats,
        height: height,
        weight: weight,
        abilities: pokemonAbilities,
        sprites: pokemonSprites,
        evolutions: evolutions,
      },
      id
    );

    return pokemonOrError.isRight() ? pokemonOrError.value : null;
  }
}
