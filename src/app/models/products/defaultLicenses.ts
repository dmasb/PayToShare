export class DefaultLicenses {
  private licenses: string[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.licenses.push(`TV${i}`);
    }
  }

  getDefaultLicenses(): string[] {
    return this.licenses;
  }
}
