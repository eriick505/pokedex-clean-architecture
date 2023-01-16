import { RemoteGetPokemonList } from "@application/usecases/pokemon";
import { RemotePokemonRoutes } from "@infra/http/routes";
import { AxiosPokemonRepository } from "@infra/repositories/axios";

export const makeGetPokemonList = () => {
  const repository = new AxiosPokemonRepository(new RemotePokemonRoutes());

  return new RemoteGetPokemonList(repository);
};
