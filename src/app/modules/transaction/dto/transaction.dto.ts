export interface TransactionDto {
    id : string;
    apiResponse ?: string;
    quantity ?: number;
    total ?: number;
    createdAt ?: string;
    updatedAt ?: string;
    meanOfPayment ?: string;
    transactionNumb ?: string;
    fees ?: Number;
    total_net ?:Number;
}