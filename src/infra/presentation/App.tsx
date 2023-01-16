import { useEffect, useState } from "react";
import Hello from "@presentation/components/Hello";
import { makeGetPokemonById } from "@infra/factories/usecases/pokemon";
import { Pokemon } from "@domain/entities";

export function App() {
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon>(undefined);

  const ble = async () => {
    const x = await makeGetPokemonById().execute({ id: 1 });

    if (x.isLeft()) {
      return console.log(x.value, "left");
    }

    setPokemon(x.value);
  };

  useEffect(() => {
    ble();
  }, []);

  return (
    <div className="App">
      <Hello />
      <h1>{pokemon?.name}</h1>
      {pokemon?.evoutions.map((evo) => (
        <li>{JSON.stringify(evo.name)}</li>
      ))}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
