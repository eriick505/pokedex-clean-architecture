import { v4 as uuidv4 } from "uuid";

export class UniqueEntityID {
  protected readonly _id: string | number;

  constructor(id?: string | number) {
    this._id = id ? id : uuidv4();
  }

  value() {
    return this._id;
  }
}
