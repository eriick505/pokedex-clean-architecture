import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ? id : new UniqueEntityID();
  }

  id() {
    this._id.value;
  }
}
