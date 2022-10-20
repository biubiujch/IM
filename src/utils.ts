import { StreamChat, Channel, DefaultGenerics, MessageResponse, Event, EventTypes } from "stream-chat";

interface Options {}

export class Client {
  private client!: StreamChat<DefaultGenerics>;
  private channel!: Channel<DefaultGenerics>;
  messages: MessageResponse<DefaultGenerics>[];
  constructor() {
    this.messages = [];
    this.init();
  }

  private async init() {
    this.client = StreamChat.getInstance("rhdr7rdrfz2z");
    await this.client.connectUser(
      {
        id: "jlahey",
        name: "Jim Lahey",
        image: "https://i.imgur.com/fR9Jz14.png",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.YHdgCF_W0FFRh-TreRrHRCB_a5b_ALwAjCv5YjUiOBc"
    );

    const channel = this.client.channel("messaging", "travel", {
      name: "Awesome channel about traveling",
    });

    this.channel = channel;

    await channel.watch();
  }

  public addEventListener(eventype: EventTypes = "message.new", eventHandel: (e: Event<DefaultGenerics>) => void) {
    this.channel.on(eventype, eventHandel);
  }

  public async send(text: string) {
    const response = await this.channel.sendMessage({
      text,
      customField: "123",
    });
  }
}
