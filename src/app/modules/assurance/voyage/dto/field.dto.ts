import { IndividuelleSanteDto } from "../../individuel/dto/field.dto"

export interface TripFieldDto {
    dateOfLeft : string,
    dateOfBack : string,
    passportNub: string,
    passportValidity : string,
    country : string,
    tripMotif: string,
    destination : string,
    relationship : string
}

export interface fullTripDetail {
    user  : string ,
    offer : string,
    trip : TripFieldDto  | IndividuelleSanteDto,
    parrainCode : string
}




