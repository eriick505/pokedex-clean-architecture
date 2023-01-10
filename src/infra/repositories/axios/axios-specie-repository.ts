import type {
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

import { SpecieRepository } from "@domain/repositories";
import { UnexpectedError } from "@domain/errors";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";

import { HttpStatusCode } from "@application/protocols/http";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";
import { RawSpecie } from "@infra/repositories/axios/model";
import { AxiosSpecieMapper } from "@infra/repositories/axios/mappers";

import { left, right } from "@shared/helpers";

export class AxiosSpecieRepository implements SpecieRepository {
  constructor(private readonly pokemonRoutes: RemotePokemonRoutes) {}

  async getSpecieById(
    request: GetSpecieByIdRequest
  ): Promise<GetSpecieByIdResponse> {
    const axiosClient = new AxiosHttpClient<RawSpecie>();
    const url = this.pokemonRoutes.getSpecieById({ id: request.id });

    const { data, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    const getEvolutionChainIdFromURL = (url: string) => {
      return url.match(/\/\d+/g)?.[0].replace("/", "") ?? "0";
    };

    const getSpecieDataToDomain = () => ({
      ...data,
      evolution_chain: {
        url: data.evolution_chain.url,
        id: getEvolutionChainIdFromURL(data.evolution_chain.url),
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(AxiosSpecieMapper.toDomain(getSpecieDataToDomain()));
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }
}
