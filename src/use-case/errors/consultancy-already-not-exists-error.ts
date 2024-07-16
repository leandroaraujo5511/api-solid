export class ConsultancyAlreadyNotExistsError extends Error {
  constructor() {
    super('Consultancy already not exists.')
  }
}
