import { EvolutionRepository } from "@domain/repositories";
import { UnexpectedError } from "@domain/errors";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";

import { HttpStatusCode } from "@application/protocols/http";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";
import { RawEvolution, EvolvesTo } from "@infra/repositories/axios/model";
import { AxiosEvolutionMapper } from "@infra/repositories/axios/mappers";

import { left, right } from "@shared/helpers";
import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";
import { Evolution } from "@domain/entities";

export class AxiosEvolutionRepository implements EvolutionRepository {
  constructor(private readonly pokemonRoutes: RemotePokemonRoutes) {}

  private getAllEvolutions(chain: EvolvesTo) {
    let storageArray: Evolution[] = [];

    const getNecessaryDataFromEvoChains = ({
      species,
      evolution_details,
    }: EvolvesTo): Evolution => {
      return AxiosEvolutionMapper.toDomain({ evolution_details, species });
    };

    storageArray.push(getNecessaryDataFromEvoChains(chain));

    const nextEvolution = chain.evolves_to;

    nextEvolution.map(
      (evolution) =>
        (storageArray = storageArray.concat(this.getAllEvolutions(evolution)))
    );

    return storageArray;
  }

  async getEvolutionById(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse> {
    const axiosClient = new AxiosHttpClient<RawEvolution>();
    const url = this.pokemonRoutes.getEvolutionById({ id: request.id });

    const { data, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    const evolutions = this.getAllEvolutions(data.chain);

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(evolutions);
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }
}
