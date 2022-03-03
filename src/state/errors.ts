export default class Errors {
  exstention_name: string | null = null;

  public have_errors(): boolean {
    return this.exstention_name !== null;
  }

  public list_errors(): string[] {
    const pont_errors = [this.exstention_name];
    return pont_errors.filter((error): error is string => error !== null);
  }
}
