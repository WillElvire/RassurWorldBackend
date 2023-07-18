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
      Plus qu'une etape vers la fin de votre processus.
      nous sommes heureux de vous compter parmis nos clients.
      Equipe Rassur
    `;
}

export const paymentMessage = (data : mailData)=> {
    return `
    Cher client .
  Vous pouvez des a present consulter payer votre demande de souscription via le lien ci dessous : .
  http://localhost:4200/payment/${data.id}
  N'hesistez pas a nous contacter si vous avez un quelconque probleme
  Equipe Rassur
  `
}


export const cotationMessage = (data : mailData) => {
  return `
  Cher client .
  Une cotation a été ajouté a votre demande.
  Vous pouvez des a present  payer votre demande de souscription via le lien ci dessous : .
  http://localhost:3002/payment/${data.id}
  N'hesistez pas a nous contacter si vous avez un quelconque probleme
  Equipe Rassur
`
}

export const receiptMessage = (data : mailData) => {
  return `
  Cher client .
  Merci pour la confiance que vous nous avez accoré .
  votre recu de souscription est disponible via le lien ci dessous : .
  http://localhost:3200/public/uploads/${data.photoUrl}
  N'hesistez pas a nous contacter si vous avez un quelconque probleme
  Equipe Rassur
`
}