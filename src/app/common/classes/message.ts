import {StatusCodes} from  "http-status-codes";


export class ReturnMessage {
    returnObject : any;
    message : string;
    code :  StatusCodes ;   
}


export enum RequestType {
    WITHDRAWALL = 1 ,
    DEPOSIT = 2
}
