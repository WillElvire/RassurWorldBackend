export interface PartnerDto {
    fullName : string; 
    phone : string ;
    description : string;
}

export interface  PartnerRateDto {
    day : number ;
    price : number;
    isActive : boolean;
    partners : string;
}