export interface TransactionDto {
    id : string;
    apiResponse ?: string;
    quantity ?: number;
    total ?: number;
    createdAt ?: string;
    updatedAt ?: string;
    meanOfPayment ?: string;
    transactionNumb ?: string;
    fees ?: number;
    total_net ?:number;
    primeApporteur?:number;
    status : transactionStatus;
    code ?:string
}



export enum transactionStatus {
    PROCESSED = 2 ,
    INITIALISATION = 1,
    FAILED = 3 ,
    BLOCKED = 4,
    SUCCESS = 5
}