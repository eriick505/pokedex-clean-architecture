export class PokemonNotFound extends Error {
  constructor() {
    super("O Pokemon que você busca não foi encontrado");
    this.name = "PokemonNotFound";
  }
}
