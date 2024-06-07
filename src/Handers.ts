import Logs from "./Logs";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const logs = new Logs();

export default class Handlers {
  private readonly token: string;
  private readonly clientId: string;
  private readonly guildId: string;

  constructor() {
    logs.debug("Loading environment variables...");

    this.token = process.env.TOKEN ?? "";
    this.clientId = process.env.CLIENT_ID ?? "";
    this.guildId = process.env.GUILD_ID ?? "";

    if (!this.token || !this.clientId || !this.guildId) {
      logs.error("One or more environment variables are missing.");
      process.exit(1);
    }

    logs.debug("Environment variables loaded.");
  }

  public registerCommands() {
    logs.debug("Registering commands...");

    const commands = [];
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath);

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath).default;
      logs.debug(`Registering command: ${command.data.name}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({version: "9"}).setToken(this.token);

    (async () => {
      try {
        logs.debug("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {body: commands});

        logs.debug("Successfully reloaded application (/) commands.");
      } catch (error) {
        logs.error(error);
      }
    })();
  }
}
