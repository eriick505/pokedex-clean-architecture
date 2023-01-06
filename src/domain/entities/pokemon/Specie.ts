export interface SpecieProps {
  evolutionChain: {
    url: string;
  };
  color: string;
}

export class Specie {
  private props: SpecieProps;

  constructor(props: SpecieProps) {
    this.props = props;
  }

  public static create(props: SpecieProps) {
    return new Specie(props);
  }

  public get evolutionChainUrl() {
    return this.props.evolutionChain.url;
  }
}
