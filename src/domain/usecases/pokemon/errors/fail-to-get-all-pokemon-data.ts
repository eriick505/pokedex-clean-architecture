export class FailToGetAllPokemonData extends Error {
  constructor() {
    super(
      "Não foi possível encontrar todos os dados do Pokemon que você procura"
    );
    this.name = "FailToGetAllPokemonData";
  }
}
