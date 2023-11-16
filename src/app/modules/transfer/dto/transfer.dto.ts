export type currencyType = "XOF" | "USD";
export type channelType  = "ussd"| "tpe";
export type momoProvider = "moov"| "orange" |"mtn";

export interface mobileMoneyResponse {
    status: number,
    message: string,
    pay_token: string, 
    payment_url:string,
    notif_token:  string,
    state: string ,
    user_msisdn:  string
}

export interface mobileMoneyTpeResponse {
    meta: {
        type:string, 
        source: string ,
        channel:channelType
    }
}

export interface mobileMoneyPayload {
  currency : currencyType,
  order_id : string,
  amount : number,
  state  : string, 
  return_url: string, 
  cancel_url: string, 
  reference: string,
  user_msisdn ?: string

}

