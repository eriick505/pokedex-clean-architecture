export interface MoveProps {
  name: string;
}

export class Move {
  private props: MoveProps;

  constructor(props: MoveProps) {
    this.props = props;
  }

  public static create(props: MoveProps) {
    return new Move(props);
  }

  public get name() {
    return this.props.name;
  }
}
