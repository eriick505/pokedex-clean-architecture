import { Pokemon } from "@domain/entities";

export interface States {
  pokemonSelected?: Pokemon;
}

export interface Actions {
  selectPokemon: (id: string | number) => void;
}

export interface PokemonStore {
  states: States;
  actions: Actions;
}

export interface StoreGetterAndSetter {
  getState: () => PokemonStore;
  setState: (fn: (v: PokemonStore) => void) => void;
}
