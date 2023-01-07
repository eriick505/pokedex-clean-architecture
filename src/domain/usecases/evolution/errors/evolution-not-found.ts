export class EvolutionNotFound extends Error {
  constructor() {
    super("A evolução que você busca não foi encontrada");
    this.name = "EvolutionNotFound";
  }
}
