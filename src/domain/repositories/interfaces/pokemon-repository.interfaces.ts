import {
  GetPokemonByIdRequest,
  GetPokemonNameListRequest,
  GetPokemonNameListResponse,
} from "@domain/usecases/pokemon";

import {
  GetSpecieByIdRequest,
  GetSpecieByIdResponse,
} from "@domain/usecases/specie";

import {
  GetEvolutionByIdRequest,
  GetEvolutionByIdResponse,
} from "@domain/usecases/evolution";

import { Pokemon } from "@domain/entities";
import { UnexpectedError } from "@domain/errors";

import {
  FailToGetAllPokemonData,
  PokemonNotFound,
} from "@domain/usecases/pokemon/errors";

import { Either } from "@shared/helpers";

export type RepoGetPokemonNameListRequest = GetPokemonNameListRequest;
export type RepoGetPokemonNameListResponse = GetPokemonNameListResponse;

export type RepoGetPokemonByIdRequest = GetPokemonByIdRequest;
export type RepoGetPokemonByIdResponse = Either<
  UnexpectedError | FailToGetAllPokemonData | PokemonNotFound,
  Pokemon
>;

export type RepoGetSpecieByIdRequest = GetSpecieByIdRequest;
export type RepoGetSpecieByIdResponse = GetSpecieByIdResponse;

export type RepoGetEvolutionByIdRequest = GetEvolutionByIdRequest;
export type RepoGetEvolutionByIdResponse = GetEvolutionByIdResponse;
