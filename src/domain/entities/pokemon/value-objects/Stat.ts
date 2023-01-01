export interface StatProps {
  name: string;
  baseStat: number;
}

export class Stat {
  private props: StatProps;

  constructor(props: StatProps) {
    this.props = props;
  }

  public static create(props: StatProps) {
    return new Stat(props);
  }

  public get name() {
    return this.props.name;
  }

  public get baseStat() {
    return this.props.baseStat;
  }
}
