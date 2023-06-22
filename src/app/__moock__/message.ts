import { mailData } from './../modules/mail/dto/mail.dto';
export  const defaultWhatsappMessage  = (data : mailData)=> {
    return `
      Bienvenue chez Rassur ${data.firstname} ${data.lastname}.
    Cher client votre demande de souscription est en cours de traitement .
    Nos equipes se chargeront de vous contacter afin de nous fournir les indications nécessaire a votre demande .
    passez une agréable journée .
    Equipe Rassur
    `;
}

export const relationShipMailler = (data : mailData)=>{
    return `
      Bienvenue chez Rassur ${data.firstname} ${data.lastname}.
      Plus qu'une etape vers la fin de souscription.
      nous sommes heureux de vous compter parmis nos clients.
      Equipe Rassur
    `;
}

export const paymentMessage = (data : mailData)=> {
    return `
    Cher client .
  Une cotation a été ajouté a votre demande.
  Vous pouvez des a present consulter payer votre demande de souscription via le lien ci dessous : .
  https://rassurworld/payment/${data.id}
  N'hesistez pas a nous contacter si vous avez un quelconque probleme
  Equipe Rassur
  `
}