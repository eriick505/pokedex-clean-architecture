export interface SpritesProps {
  frontDefault: string;
  artWorkFront: string;
  dreamWorldFront: string;
}

export class Sprites {
  private props: SpritesProps;

  constructor(props: SpritesProps) {
    this.props = props;
  }

  public static create(props: SpritesProps) {
    return new Sprites(props);
  }

  public get frontDefault() {
    return this.props.frontDefault;
  }

  public get artWorkFront() {
    return this.props.artWorkFront;
  }

  public get dreamWorldFront() {
    return this.props.dreamWorldFront;
  }
}
