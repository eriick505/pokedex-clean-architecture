import {
  PokeDetails,
  Pokedex,
  SearchPokemon,
} from "@presentation/modules/pokedex/components";

export function App() {
  return (
    <div className="mt-8 grid grid-cols-[1fr_340px] gap-4">
      <main>
        <SearchPokemon />
        <Pokedex />
      </main>
      <aside className="bg-white bg-[#202020]">
        <PokeDetails />
      </aside>
    </div>
  );
}
