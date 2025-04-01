export interface APIConfig {
  serverURL: string;
}
import { Agents } from "./agents";
import { Room } from "./rooms";
import { Messages } from "./messages";
import { Config } from "./config";
import { Visitor } from "./visitors";

export class RocketChatLivechat {
  public agents: Agents;
  public config: Config;
  public visitor: Visitor;
  public room: Room;
  public messages: Messages;

  constructor({ serverURL }: APIConfig) {
    this.agents = new Agents({ serverURL });
    this.config = new Config({ serverURL });
    this.visitor = new Visitor({ serverURL });
    this.room = new Room({ serverURL });
    this.messages = new Messages({ serverURL });
  }
}
