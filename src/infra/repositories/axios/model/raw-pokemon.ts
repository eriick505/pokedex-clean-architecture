interface RawType {
  type: { name: string };
}

interface RawMove {
  move: { name: string };
}

interface RawStat {
  base_stat: number;
  stat: { name: string };
}

interface RawAbility {
  is_hidden: boolean;
  ability: { name: string };
}

interface RawSprites {
  front_default: string;
  other: {
    dream_world: { front_default: string };
    "official-artwork": { front_default: string };
  };
}

export interface RawPokemon {
  id: number;
  name: string;
  types: RawType[];
  moves: RawMove[];
  stats: RawStat[];
  height: number;
  weight: number;
  abilities: RawAbility[];
  sprites: RawSprites;
}
