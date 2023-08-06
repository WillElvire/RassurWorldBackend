export type mailDriver = "Email" | "Telephone";
export type mailType   = "Relance" | "Lien" | "Bienvenue"| "Cotation" | "Receipt";
export interface mailData {
    body ?: string,
    phone ?: string
    email ?: string;
    lien ?: string;
    firstname ?:string;
    lastname ?:string;
    type ?: mailType,
    id ?: string;
    cotation ?: string;
    fileUrl ?: string;
    photoUrl ? : string;
    useWhatsapp ?: boolean;
    
}