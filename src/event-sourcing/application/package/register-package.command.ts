export class RegisterPackageCommand {
  constructor(
    readonly membershipId: string,
    readonly credits: number,
    readonly year: number,
    readonly month: number,
  ) {}
}
