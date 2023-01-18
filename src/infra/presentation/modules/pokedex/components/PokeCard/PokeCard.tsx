import { Pokemon } from "@domain/entities";

import { TypesList } from "@presentation/modules/pokedex/components";

import { usePokeCard } from "./usePokeCard";
import * as T from "./styles";

interface PokeCardProps {
  pokemon: Pokemon;
}

export function PokeCard({ pokemon }: PokeCardProps) {
  const { handleDobleClick, handleImageonLoadingComplete, sourceGif, size } =
    usePokeCard(pokemon);

  return (
    <T.PokeCard onDoubleClick={handleDobleClick} role="button">
      <T.PokeImage
        onLoad={handleImageonLoadingComplete}
        src={sourceGif}
        alt={pokemon.name}
        height={size.height}
        width={size.width}
        css={[size.top]}
      />

      <T.PokeInfo>
        <T.PokeId>Nº{pokemon.id}</T.PokeId>
        <T.PokeName>{pokemon.name}</T.PokeName>
      </T.PokeInfo>

      <TypesList typesList={pokemon.types} />
    </T.PokeCard>
  );
}
