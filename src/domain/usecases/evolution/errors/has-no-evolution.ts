export class HasNoEvolution {
  name: string = "HasNoEvolution";
  message: string;

  constructor(id: string | number) {
    this.message = `O id ${id} não possui evolução`;
  }
}
