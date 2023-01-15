import { RemoteGetPokemonById } from "@application/usecases/pokemon";
import { RemotePokemonRoutes } from "@infra/http/routes";
import { AxiosPokemonRepository } from "@infra/repositories/axios";

export const makeGetPokemonById = () => {
  const repository = new AxiosPokemonRepository(new RemotePokemonRoutes());

  return new RemoteGetPokemonById(repository);
};
