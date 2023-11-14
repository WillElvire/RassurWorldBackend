import { apiPost } from "./../api/api.service";

export type chatDriver = "chat" | "document";

export class WhatsappService {
  private readonly apiUrl    = process.env.ULTRA_API_URL;
  private readonly instance  = process.env.ULTRA_API_INSTANCE;
  private readonly token     = process.env.ULTRA_API_TOKEN;
  private driver: chatDriver = "chat";

  private body: string;
  private receiver: string;
  private filename: string;
  private fileUrl: string;

  constructor() {}

  setFileName(filename: string) {
    this.filename = filename;
    return this;
  }

  setFileUrl(fileUrl: string) {
    this.fileUrl = fileUrl;
    return this;
  }

  setDriver(driver: chatDriver) {
    this.driver = driver;
    return this;
  }

  setBody(body: string) {
    this.body = body;
    return this;
  }

  setReceiver(phone: string) {
    this.receiver = phone;
    return this;
  }

  send() {
    if (this.driver == "document") {
      return this.configureDoc();
    }
    return this.configure();
  }

  private async configureDoc() {
    var data = JSON.stringify({
      token: this.token,
      to: this.receiver,
      filename: this.filename,
      document: this.fileUrl,
      caption: "Rassur receipt",
    });

    const config = this.config(data);
    return await apiPost(config.url, data);
  }

  private async configure() {
    var data = JSON.stringify({
      token: this.token,
      to: this.receiver,
      body: this.body,
      priority: 10,
    });
    const config = this.config(data);
    return await apiPost(config.url, data);
  }

  private config(data) {
    return {
      method: "post",
      //url: "https://api.ultramsg.com/instance51691/messages/"+this.driver  ,
      url : this.apiUrl + "messages/" + this.driver,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
  }
}
