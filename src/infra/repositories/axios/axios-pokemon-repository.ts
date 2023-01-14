import { Evolution } from "@domain/entities";

import type {
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
} from "@domain/usecases/pokemon";

import {
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

import { PokemonRepository } from "@domain/repositories";
import { UnexpectedError } from "@domain/errors";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";

import { HttpStatusCode } from "@application/protocols/http";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";

import {
  RawPokemon,
  RawPokemonNameList,
} from "@infra/repositories/axios/model";
import { AxiosPokemonMapper } from "@infra/repositories/axios/mappers";

import { RawSpecie } from "@infra/repositories/axios/model";
import { AxiosSpecieMapper } from "@infra/repositories/axios/mappers";

import { RawEvolution, EvolvesTo } from "@infra/repositories/axios/model";
import { AxiosEvolutionMapper } from "@infra/repositories/axios/mappers";

import { left, right } from "@shared/helpers";

export class AxiosPokemonRepository implements PokemonRepository {
  constructor(private readonly pokemonRoutes: RemotePokemonRoutes) {}

  async getPokemonNameList(
    request: GetPokemonNameListRequest
  ): Promise<GetPokemonNameListResponse> {
    const axiosClient = new AxiosHttpClient<RawPokemonNameList>();
    const url = this.pokemonRoutes.getPokemonNameList({ limit: request.limit });

    const { data, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(data.results.map((p) => p.name));
      default:
        return left(new UnexpectedError());
    }
  }

  // buscar evolution pelo id ao buscar o pokemon pelo id
  async getPokemonById(
    request: GetPokemonByIdRequest
  ): Promise<GetPokemonByIdResponse> {
    const axiosClient = new AxiosHttpClient<RawPokemon>();
    const url = this.pokemonRoutes.getPokemonById({ id: request.id });

    const { data, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(AxiosPokemonMapper.toDomain(data));
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }

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
