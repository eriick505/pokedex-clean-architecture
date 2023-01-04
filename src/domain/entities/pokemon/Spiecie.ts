export interface SpiecieProps {
  evolutionChain: {
    url: string;
  };
}

export class Spiecie {
  private props: SpiecieProps;

  constructor(props: SpiecieProps) {
    this.props = props;
  }

  public static create(props: SpiecieProps) {
    return new Spiecie(props);
  }

  public get evolutionChainUrl() {
    return this.props.evolutionChain.url;
  }
}
