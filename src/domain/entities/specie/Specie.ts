import { Entity, UniqueEntityID } from "@shared/domain";

export interface SpecieProps {
  evolutionChain: {
    url: string;
    id: string | number;
  };
  color: string;
}

export class Specie extends Entity<SpecieProps> {
  constructor(props: SpecieProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: SpecieProps) {
    return new Specie(props);
  }

  public get evolutionChainUrl() {
    return this.props.evolutionChain.url;
  }

  public get evolutionChainID() {
    return this.props.evolutionChain.url;
  }

  public get color() {
    return this.props.color;
  }
}
