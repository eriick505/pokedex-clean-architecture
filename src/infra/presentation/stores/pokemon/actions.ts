import { Actions, StoreGetterAndSetter } from "./interfaces";

export const actions = ({
  getState,
  setState,
}: StoreGetterAndSetter): Actions => ({
  selectPokemon(id) {
    const findPokemonById = () => undefined;

    setState(({ states }) => {
      states.pokemonSelected = findPokemonById();
    });
  },
});
