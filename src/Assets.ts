export {};
export default class Assets {
  public readonly logs: any;
  public readonly name: string;
  public readonly errorEmoji: string;
  public readonly successEmoji: string;
  public readonly discordInvite: string;
  public readonly version: string;

  constructor() {
    this.name = "Movie Night Bot";
    this.errorEmoji = "❌";
    this.successEmoji = "✅";
    this.discordInvite = "";
    this.version = "0.0.1";
  }
}
