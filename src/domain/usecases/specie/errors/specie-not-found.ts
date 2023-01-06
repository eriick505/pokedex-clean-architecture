export class SpecieNotFound extends Error {
  constructor() {
    super("A espécie que você busca não foi encontrada");
    this.name = "SpecieNotFound";
  }
}
