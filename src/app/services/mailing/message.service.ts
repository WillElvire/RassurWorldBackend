var http = require("https");

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
    private configure() {
        const options = {
            "method": "POST",
            "hostname": "api.ultramsg.com",
            "port": null,
            "path": "/instance51691/messages/chat",
            "headers": {
              "content-type": "application/json"
            }
          };
          
          const req = http.request(options, function (res) {
            const chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function () {
              const body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          }); 
          var postData = JSON.stringify({
              "token" : this.token,
              "to"    : this.receiver,
              "body"  :this.body
          });
          req.write(postData);
          req.end();
          
    }
}