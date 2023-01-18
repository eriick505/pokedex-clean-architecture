import { useForm } from "react-hook-form";
import { IconPokeball } from "@presentation/components";

import * as T from "./styles";

type FormData = {
  search: string;
};

export function SearchPokemon() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const hasError = Boolean(errors.search?.message);

  const handleSearch = handleSubmit((data) => {
    console.log(data, "data");
  });

  return (
    <T.FormControl>
      <T.SearchPokemon
        type="text"
        placeholder="Search your Pokémon!"
        {...register("search", {
          required: { message: "Campo obrigatório", value: true },
          minLength: {
            message: "Voce deve fornecer um valor maior que 4",
            value: 4,
          },
        })}
        onKeyUp={(e) => e.code === "Enter" && handleSearch()}
      />

      <T.SearchLabel hasError={hasError}>
        Search your Pokémon! {errors.search?.message}
      </T.SearchLabel>

      <T.SearchButton onClick={handleSearch}>
        <IconPokeball />
      </T.SearchButton>
    </T.FormControl>
  );
}
