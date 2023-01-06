import { Specie } from "@domain/entities";
import { RawSpecie } from "@infra/repositories/axios/model";

export class AxiosSpecieMapper {
  static toDomain(raw: RawSpecie): Specie {
    return Specie.create({
      color: raw.color.name,
      evolutionChain: raw.evolution_chain,
    });
  }
}
