export class FailToGetAllPokemons extends Error {
  constructor() {
    super("Algum Pokemon acabou escapando da nossa pokedex");
    this.name = "FailToGetAllPokemons";
  }
}
