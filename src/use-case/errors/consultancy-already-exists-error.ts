export class ConsultancyAlreadyExistsError extends Error {
  constructor() {
    super('Code already exists.')
  }
}
