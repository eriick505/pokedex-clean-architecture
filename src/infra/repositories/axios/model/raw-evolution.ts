interface EvolutionDetail {
  gender: string;
  item?: {
    name: string;
  };
  min_level: number;
  trigger: {
    name: string;
  };
}

export interface EvolvesTo {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolvesTo[];
  species: {
    name: string;
  };
}

export interface RawEvolution {
  chain: EvolvesTo;
}
