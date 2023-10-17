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
    code ?:string
}