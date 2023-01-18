import { SyntheticEvent } from "react";
import { Pokemon } from "@domain/entities";
import tw from "twin.macro";

export const usePokeCard = ({ id, name, evoutions }: Pokemon) => {
  const handleImageonLoadingComplete = (
    img: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = img.target as HTMLImageElement;

    if (imgElement.clientHeight > 77) {
      imgElement.style.height = "80px";
    }

    if (imgElement.clientWidth > 100) {
      imgElement.style.height = "70px";
    }
  };

  const sourceGif = `https://play.pokemonshowdown.com/sprites/xyani/${name}.gif`;

  const pokemonImageSizes = {
    0: {
      width: 40,
      height: 40,
      top: tw`top-[-15px]`,
    },
    1: {
      width: 60,
      height: 60,
      top: tw`top-[-20px]`,
    },
    2: {
      width: 100,
      height: 100,
      top: tw`top-[-35px]`,
    },
  };

  const getPokemonImageSize = () => {
    const index = evoutions.findIndex((p) => p.name === name);

    return (index > 2 ? 2 : index) as keyof typeof pokemonImageSizes;
  };

  const size = pokemonImageSizes[getPokemonImageSize()];

  const handleDobleClick = () => {
    console.log(id);
  };

  return {
    handleDobleClick,
    handleImageonLoadingComplete,
    sourceGif,
    size,
  };
};
