import tw, { styled } from "twin.macro";

type SearchLabelProps = {
  hasError: boolean;
};

export const FormControl = tw.div`
  flex 
  items-center 
  justify-between 
  
  relative
  p-3 
  rounded-xl 

  shadow-lg 

  bg-white 
`;

export const SearchPokemon = tw.input`
  block 
  w-full 
  mx-3 

  appearance-none 
  
  bg-transparent 

  focus:outline-none 
  placeholder:text-transparent
`;

export const SearchLabel = styled.label(({ hasError }: SearchLabelProps) => [
  tw`
    absolute
    top-[50%]
    left-5

    translate-y-[-50%]
    duration-300
    origin-[0%]
    pointer-events-none 
  `,
  hasError ? tw`text-red-400 peer-focus:text-red-400` : "",
]);

export const SearchButton = tw.button`
  flex
  items-center
  justify-center

  w-10
  h-10
  text-3xl
  rounded-xl

  shadow-lg
  shadow-red-500/50

  text-white
  bg-red-500

  active:bg-blue-500
  active:shadow-blue-500/50
`;
