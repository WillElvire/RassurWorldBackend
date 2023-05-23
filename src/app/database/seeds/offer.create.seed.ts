import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Offer } from "../../entities/Offer";

export class OfferCreatedSeed implements Seeder {
    async  run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        const offerRepository  = dataSource.getRepository(Offer);
        const offers = [
            {
                libelle : "Assurance Voyage",
                description : "",
                isActive : 1
            },
            {
                libelle : "Assurance Auto",
                description : "",
                isActive : 1
            },
            {
                libelle : "Assurance Divers",
                description : "",
                isActive : 1
            },
            {
                libelle : "Assurance Mutlirisque",
                description : "",
                isActive : 1
            }
        ]

        offers.forEach((offer)=> {
            const existOffre = offerRepository.findOneBy({libelle : offer.libelle});
            if(!existOffre) {
                const newOffer = offerRepository.create(offer as any);
                offerRepository.save(newOffer);
            }
           
        })

       
    }

}