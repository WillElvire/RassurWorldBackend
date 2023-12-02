import { generateId } from './../../../common/classes/apiConfig';



export type currencyType = "XOF" | "USD";
export type channelType  = "ussd"| "tpe";
export type momoProvider = "moov"| "orange" |"mtn";

export interface mobileMoneyResponse {
    status      : number,
    message     : string,
    pay_token   : string, 
    payment_url : string,
    notif_token : string,
    state       : string ,
    user_msisdn : string
}

export interface mobileMoneyTpeResponse {
    meta: {
        type    :string, 
        source  : string ,
        channel :channelType
    }
}

export interface ImomoTransfer {
  amount : number;
  transferId ?:string;
  insurranceId ?:string;
  meanOfPayement ?:momoProvider;
}
export class mobileMoneyPayload {
  currency    : currencyType
  order_id    : string;
  amount      : number;
  state       : string ;
  return_url  : string ;
  cancel_url  : string ;
  reference   : string;
  user_msisdn?: string;
  meanOfPayement ?: momoProvider;



  constructor(transfer : ImomoTransfer){
    this.return_url = "http://localhost:4200/payment/"+this.state+"/processing";
    this.cancel_url = "http://localhost:4200/transaction/failed";
    this.amount = transfer.amount;
    this.meanOfPayement = transfer.meanOfPayement;
    this.order_id = generateId();
    this.reference = "Rassur"
  }

}


export class TransferDto {
   
    private provider : string
    private request  : string;
    private response : string;
    private ip       : string;
    private browser  : string;
    private apiPath  : string;
    private method   : string;

    constructor(apiPath : string ,method : string, request = null , response = null , browser = null  , ip = null ){
       this.provider  = process.env.TRANSFER_PROVIDER;
       this.request   = request;
       this.response  = response;
       this.browser   = browser;
       this.apiPath   = apiPath;
       this.method    = method;
       this.ip        = ip;
    }
}

export  class RemoteConfig {
    private   ipAddress : any;
    private   browser   : string;
    private   country   : any;
    public static INSTANCE : RemoteConfig;


    public static getInstance(req = null) : RemoteConfig  {

      if(this.INSTANCE == null || this.INSTANCE == undefined)
      {
        return this.INSTANCE =  new RemoteConfig(req);
      } 
      return this.INSTANCE
      
    }
    private constructor(req) {
        this.browser   = req?.headers['user-agent'];
        this.ipAddress = req?.socket.remoteAddress;
       
    } 

    public getConfig =()=> {
        return  {
          browser : this.browser, 
          ipAddress : this.ipAddress,
          country  : this.country
        }
    }
}