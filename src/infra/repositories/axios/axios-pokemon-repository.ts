import type {
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
  GetPokemonByIdRequest,
  GetPokemonByIdResponse,
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/pokemon";

import { PokemonRepository } from "@domain/repositories";
import { UnexpectedError } from "@domain/errors";
import { PokemonNotFound } from "@domain/usecases/pokemon/errors";

import { HttpStatusCode } from "@application/protocols/http";

import { AxiosHttpClient } from "@infra/http";
import { RemotePokemonRoutes } from "@infra/http/routes";

import {
  RawPokemon,
  RawPokemonNameList,
  RawSpecie,
} from "@infra/repositories/axios/model";

import {
  AxiosPokemonMapper,
  AxiosSpecieMapper,
} from "@infra/repositories/axios/mappers";

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

  getEvolutionById(
    request: GetEvolutionByIdRequest
  ): Promise<GetEvolutionByIdResponse> {
    throw new Error("Method not implemented.");
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

    switch (statusCode) {
      case HttpStatusCode.ok:
        return right(AxiosSpecieMapper.toDomain(data));
      case HttpStatusCode.notFound:
        return left(new PokemonNotFound());
      default:
        return left(new UnexpectedError());
    }
  }
}
