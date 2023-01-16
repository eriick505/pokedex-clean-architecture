import { RemoteGetPokemonNameList } from "@application/usecases/pokemon";
import { RemotePokemonRoutes } from "@infra/http/routes";
import { AxiosPokemonRepository } from "@infra/repositories/axios";

export const makeGetPokemonNRemoteGetPokemonNameList = () => {
  const repository = new AxiosPokemonRepository(new RemotePokemonRoutes());

  return new RemoteGetPokemonNameList(repository);
};
