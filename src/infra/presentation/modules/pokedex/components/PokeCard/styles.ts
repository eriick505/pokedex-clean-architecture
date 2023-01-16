import tw from "twin.macro";

export const PokeCard = tw.article`
  relative

  flex
  flex-col
  justify-end
  items-center

  pb-6
  mb-8
  h-48
  w-full
  rounded-2xl

  shadow-lg
  transition-all
  cursor-pointer
  
  bg-white

  hover:scale-90
`;

export const PokeImage = tw.img`
  absolute
  left-2/4

  w-auto
  h-auto

  transform
  translate-x-[-50%]
`;

export const PokeInfo = tw.div`
  text-center 
  mb-2
`;

export const PokeId = tw.span`
  font-extrabold 
  text-xs 

  mb-1

  text-gray-400 
`;

export const PokeName = tw.h2`
  capitalize 
  font-extrabold 
  text-lg

  text-[#03133c] 
`;
