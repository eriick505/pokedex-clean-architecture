import { useEffect, useState } from "react";

import { Pokemon } from "@domain/entities";
import { makeGetPokemonList } from "@infra/factories/usecases/pokemon";

import { PokeCard } from "@presentation/modules/pokedex/components";

export function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const ble = async () => {
    const x = await makeGetPokemonList().execute({ limit: 10 });

    if (x.isLeft()) {
      return console.log(x.value, "left");
    }

    setPokemonList(x.value);
  };

  useEffect(() => {
    ble();
  }, []);

  if (!pokemonList.length) return;
  return (
    <div className="mt-14">
      <ul className="grid grid-cols-3 gap-4">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <PokeCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
}
