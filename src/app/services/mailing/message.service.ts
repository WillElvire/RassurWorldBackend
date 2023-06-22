import { apiPost } from './../api/api.service';

export class WhatsappService {

    private readonly apiUrl   = "https://api.ultramsg.com/instance51691/";
    private readonly instance = "instance51691";
    private readonly token    = "dpgghzdzdxlxqhdg";

    private body : string;
    private receiver  : string;

    constructor(){

    }

    setBody(body : string) {
        this.body = body;
        return this;
    }

    setReceiver(phone : string) {
        this.receiver = phone;
        return this;
    }


    send() {
        return this.configure();
    }
     private async configure() {
      
      var data = JSON.stringify({
        "token": this.token,
        "to": this.receiver,
        "body": this.body,
        "priority": 10,
      });
    
      var config = {
        method: 'post',
        url: 'https://api.ultramsg.com/instance51691/messages/chat',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };


      return await apiPost(config.url,data);

          
    }
}