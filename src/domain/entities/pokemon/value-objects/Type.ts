export interface TypeProps {
  name: string;
}

export class Type {
  private props: TypeProps;

  constructor(props: TypeProps) {
    this.props = props;
  }

  public static create(props: TypeProps) {
    return new Type(props);
  }

  public get name() {
    return this.props.name;
  }
}
