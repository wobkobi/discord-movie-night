import Assets from "./Assets";
import log4js from "log4js";
export default class Logs {
  private std: any;
  private assets: any;

  constructor() {
    this.assets = new Assets();
    log4js.configure({
      appenders: {
        Alive: {type: "stdout"},
      },
      categories: {
        default: {
          appenders: ["Alive"],
          level: "all",
        },
      },
    });

    this.std = log4js.getLogger("Alive");
    this.std.addContext("Version", this.assets.version);
  }

  public debug(message: any) {
    this.std.debug(message);
  }

  public info(message: any) {
    this.std.info(message);
  }

  // error
  public error(message: any) {
    this.std.error(message);
  }

  // fatal

  public fatal(message: any) {
    this.std.fatal(message);
  }

  // warn
  public warn(message: any) {
    this.std.warn(message);
  }

  public initLog() {
    this.std.info("Starting bot...");
  }
}
