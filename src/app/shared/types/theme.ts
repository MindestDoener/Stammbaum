export class Theme {
  public static readonly LIGHT = new Theme('light');
  public static readonly DARK = new Theme('dark');

  private constructor(public readonly name: string) {}
}
