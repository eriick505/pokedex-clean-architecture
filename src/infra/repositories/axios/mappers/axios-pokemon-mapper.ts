import { Pokemon } from "@domain/entities";
import { RawPokemon } from "@infra/repositories/axios/model";

export class AxiosPokemonMapper {
  static toDomain(raw: RawPokemon): Pokemon {
    const types = raw.types.map((t) => t.type);
    const moves = raw.moves.map((m) => m.move);

    const stats = raw.stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    }));

    const abilities = raw.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    }));

    const sprites = {
      frontDefault: raw.sprites.front_default,
      artWorkFront: raw.sprites.other["official-artwork"].front_default,
      dreamWorldFront: raw.sprites.other.dream_world.front_default,
    };

    const pokemonOrError = Pokemon.create(
      {
        name: raw.name,
        types,
        moves,
        stats,
        height: raw.height,
        weight: raw.weight,
        abilities,
        sprites,
        // evolutions: EvolutionProps[],
      },
      raw.id
    );

    return pokemonOrError.isRight() ? pokemonOrError.value : null;
  }
}
