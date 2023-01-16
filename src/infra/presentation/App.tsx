import { useEffect, useState } from "react";
import { makeGetPokemonById } from "@infra/factories/usecases/pokemon";
import { Pokemon } from "@domain/entities";
import { PokeCard } from "@presentation/modules/pokedex/components";

export function App() {
  const [pokemon, setPokemon] = useState<Pokemon>(undefined);

  const ble = async () => {
    const x = await makeGetPokemonById().execute({ id: "eevee" });

    if (x.isLeft()) {
      return console.log(x.value, "left");
    }

    setPokemon(x.value);
  };

  useEffect(() => {
    ble();
  }, []);

  if (!pokemon) return;
  return (
    <div className="App">
      <PokeCard pokemon={pokemon} />
      {pokemon?.evoutions.map((evo) => (
        <li key={evo.name}>{evo.name}</li>
      ))}
    </div>
  );
}
