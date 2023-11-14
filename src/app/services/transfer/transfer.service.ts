export type transferProvider = "Bizao" | "Hub2" | "CinetPay";


export interface transferCredentials  {
  clientId     : string,
  clientSecret : string,
  accessToken  : string
}

export class TransferService {
   
    provider : transferProvider = "Hub2";
    baseUrl  : string ;
    credentials : transferCredentials ;

    constructor() {

    }

    setProvider(provider : transferProvider) {
        this.provider = provider;
        return this;
    }

    setBaseUrl(baseUrl : string) {
        this.baseUrl = baseUrl;
        return this;
    }

    setCredentials(credentials : transferCredentials) {
        this.credentials = credentials;
        return this;
    }


}