export interface EvolutionProps {
  name: string;
  minLevel: number;
  triggerName?: string;
  item?: string;
}

export class Evolution {
  private props: EvolutionProps;

  constructor(props: EvolutionProps) {
    this.props = props;
  }

  public static create(props: EvolutionProps) {
    return new Evolution(props);
  }

  public get name() {
    return this.props.name;
  }

  public get minLevel() {
    return this.props.minLevel;
  }

  public get triggerName() {
    return this.props.triggerName;
  }

  public get item() {
    return this.props.item;
  }
}
