import { PokemonRepository } from "@domain/repositories";
import { UnexpectedError } from "@domain/errors";
import {
  FailToGetAllPokemonData,
  PokemonNotFound,
} from "@domain/usecases/pokemon/errors";

import type {
  RepoGetEvolutionByIdRequest,
  RepoGetEvolutionByIdResponse,
  RepoGetPokemonByIdRequest,
  RepoGetPokemonByIdResponse,
  RepoGetPokemonNameListRequest,
  RepoGetPokemonNameListResponse,
  RepoGetSpecieByIdRequest,
  RepoGetSpecieByIdResponse,
} from "@domain/repositories";

import { HttpStatusCode } from "@application/protocols/http";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";

import {
  RawPokemon,
  RawPokemonNameList,
  RawSpecie,
  RawEvolution,
  EvolvesTo,
} from "@infra/repositories/axios/model";

import {
  AxiosPokemonMapper,
  AxiosSpecieMapper,
  AxiosEvolutionMapper,
} from "@infra/repositories/axios/mappers";

import { left, right } from "@shared/helpers";
import { HasNoEvolution } from "@domain/usecases/evolution/errors";

export class AxiosPokemonRepository implements PokemonRepository {
  constructor(private readonly pokemonRoutes: RemotePokemonRoutes) {}

  async getPokemonNameList(
    request: RepoGetPokemonNameListRequest
  ): Promise<RepoGetPokemonNameListResponse> {
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

  async getPokemonById(
    request: RepoGetPokemonByIdRequest
  ): Promise<RepoGetPokemonByIdResponse> {
    const axiosClient = new AxiosHttpClient<RawPokemon>();
    const url = this.pokemonRoutes.getPokemonById({ id: request.id });

    const { data: pokemonData, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    if (statusCode === HttpStatusCode.notFound) {
      return left(new PokemonNotFound());
    }

    if (statusCode !== HttpStatusCode.ok) {
      return left(new UnexpectedError());
    }

    const specieOrError = await this.getSpecieById({ id: pokemonData.id });

    if (specieOrError.isLeft()) {
      return left(new FailToGetAllPokemonData());
    }

    const { evolutionChainID } = specieOrError.value;

    const evolutionsOrError = await this.getEvolutionById({
      id: evolutionChainID,
    });

    if (evolutionsOrError.isLeft()) {
      return left(new FailToGetAllPokemonData());
    }

    const evolutions = Array.isArray(evolutionsOrError.value)
      ? evolutionsOrError.value
      : [];

    return right(AxiosPokemonMapper.toDomain(pokemonData, evolutions));
  }

  async getSpecieById(
    request: RepoGetSpecieByIdRequest
  ): Promise<RepoGetSpecieByIdResponse> {
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
    let storageArray: Omit<EvolvesTo, "evolves_to">[] = [];

    const getNecessaryDataFromEvoChains = ({
      species,
      evolution_details,
    }: EvolvesTo) => {
      return { evolution_details, species };
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
    request: RepoGetEvolutionByIdRequest
  ): Promise<RepoGetEvolutionByIdResponse> {
    const axiosClient = new AxiosHttpClient<RawEvolution>();
    const url = this.pokemonRoutes.getEvolutionById({ id: request.id });

    const { data, statusCode } = await axiosClient.request({
      method: "get",
      url,
    });

    const allEvolutions = this.getAllEvolutions(data.chain);
    const evolutions = allEvolutions.map((evolution) =>
      AxiosEvolutionMapper.toDomain(evolution)
    );

    const handleOkData = () => {
      if (evolutions.length <= 1) return new HasNoEvolution(request.id);
      return evolutions;
    };

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(handleOkData());
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }
}
