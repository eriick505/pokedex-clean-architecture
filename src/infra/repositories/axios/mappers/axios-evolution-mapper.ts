import { Evolution } from "@domain/entities";
import { EvolvesTo } from "@infra/repositories/axios/model";

export class AxiosEvolutionMapper {
  static toDomain(raw: Omit<EvolvesTo, "evolves_to">): Evolution {
    return Evolution.create({
      name: raw.species.name,
      minLevel: raw.evolution_details[0].min_level ?? 1,
      triggerName: raw.evolution_details[0].trigger.name ?? undefined,
      item: raw.evolution_details[0].item.name ?? undefined,
    });
  }
}
