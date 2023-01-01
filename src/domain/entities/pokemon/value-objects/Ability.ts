export interface AbilityProps {
  name: string;
  isHidden: number;
}

export class Ability {
  private props: AbilityProps;

  constructor(props: AbilityProps) {
    this.props = props;
  }

  public static create(props: AbilityProps) {
    return new Ability(props);
  }

  public get name() {
    return this.props.name;
  }

  public get isHidden() {
    return this.props.isHidden;
  }
}
