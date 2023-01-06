import {
  Ability,
  Move,
  Sprites,
  Stat,
  Type,
} from "@domain/entities/pokemon/value-objects";

import type {
  AbilityProps,
  MoveProps,
  SpritesProps,
  StatProps,
  TypeProps,
} from "@domain/entities/pokemon/value-objects";

import { UniqueEntityID, Entity } from "@shared/domain";
import { Either, right } from "@shared/helpers";

interface PokemonProps {
  name: string;
  types: Type[];
  moves: Move[];
  stats: Stat[];
  height: number;
  weight: number;
  abilities: Ability[];
  sprites: Sprites;
}

interface PokemonData {
  name: string;
  types: TypeProps[];
  moves: MoveProps[];
  stats: StatProps[];
  height: number;
  weight: number;
  abilities: AbilityProps[];
  sprites: SpritesProps;
}

export class Pokemon extends Entity<PokemonProps> {
  constructor(props: PokemonProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: PokemonData,
    id?: string | number
  ): Either<unknown, Pokemon> {
    const pokemonId = id ? new UniqueEntityID(id) : undefined;

    const types = props.types.map((type) => Type.create({ name: type.name }));
    const moves = props.moves.map((move) => Move.create({ name: move.name }));
    const stats = props.stats.map((stat) => Stat.create(stat));
    const abilities = props.abilities.map((ability) => Ability.create(ability));
    // const evolutions = props.evolutions.map((evo) => Evolution.create(evo));

    const sprites = Sprites.create({
      frontDefault: props.sprites.frontDefault,
      artWorkFront: props.sprites.artWorkFront,
      dreamWorldFront: props.sprites.dreamWorldFront,
    });

    return right(
      new Pokemon(
        {
          name: props.name,
          types,
          moves,
          stats,
          height: props.height,
          weight: props.weight,
          abilities,
          sprites,
          // evolutions,
        },
        pokemonId
      )
    );
  }

  public get name() {
    return this.props.name;
  }

  public get types() {
    return this.props.types;
  }

  public get moves() {
    return this.props.moves;
  }

  public get stats() {
    return this.props.stats;
  }

  public get height() {
    return this.props.height;
  }

  public get weight() {
    return this.props.weight;
  }

  public get abilities() {
    return this.props.abilities;
  }

  public get sprites() {
    return this.props.sprites;
  }
}
