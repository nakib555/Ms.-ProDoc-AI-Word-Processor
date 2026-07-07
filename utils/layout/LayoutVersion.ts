export class LayoutVersion {
  private version = 0;

  get(): number {
    return this.version;
  }

  increment(): void {
    this.version++;
  }
}
