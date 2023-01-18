import { create } from "zustand";
import produce from "immer";

import { states } from "./states";
import { actions } from "./actions";
import type { PokemonStore } from "./interfaces";

export const usePokemonStore = create<PokemonStore>((set, getState) => {
  const setState = (fn: (value: PokemonStore) => void) => set(produce(fn));

  return {
    states,
    actions: actions({ getState, setState }),
  };
});
