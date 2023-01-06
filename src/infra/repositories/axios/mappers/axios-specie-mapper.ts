import { Specie } from "@domain/entities";
import { RawSpecie } from "@infra/repositories/axios/model";

interface RawSpecieToDoamin extends RawSpecie {
  evolution_chain: {
    url: string;
    id: string | number;
  };
}

export class AxiosSpecieMapper {
  static toDomain(raw: RawSpecieToDoamin): Specie {
    return Specie.create({
      color: raw.color.name,
      evolutionChain: raw.evolution_chain,
    });
  }
}
