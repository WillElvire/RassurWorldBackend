import { ReturnMessage } from './../../common/classes/message';
import { PartnersRepository } from "../../repository/Partners.repository";
import { OK } from 'http-status-codes';
import { PartnerRateDto } from './dto/partner.dto';
import { RateRepository } from '../../repository/Rate.repository';
import { Rate } from '../../entities/Rate';

const partnersRepository = PartnersRepository;
const rateRepository     = RateRepository;

export class PartnerPersistence {

   /********************************************************/ 
   /*                      ADD PARTNER                     */
   /********************************************************/

    async addPartner(partner) {

       let message        = new ReturnMessage();
       const existPartner = await partnersRepository.findOneBy({phone : partner.phone});

       if(!existPartner) {
        try {

            const newPartner = partnersRepository.create(partner as any);
            const result     = await partnersRepository.save(newPartner);
            
            message.code         = OK;
            message.message      = "Partner created successfully !";
            message.returnObject = result;

        }catch(Exception){
            message.message = Exception.message;
            message.code = 500;
        }
        return message;
       }
       
       message.message = "Partner with this phone number already Exists";
       message.code = 500;
       return message;
      
       
    }

   /********************************************************/ 
   /*                      ADD RATE                        */
   /********************************************************/

    async addRate(partnerRateDto : PartnerRateDto) {

        let message        = new ReturnMessage();
        const partnerExist = await partnersRepository.findOneBy({id : partnerRateDto.partners});

        if(!partnerExist) {
            message.message = "Partner doesn't exist";
            message.code = 500;
            return message;
        }
        
        const rateExists = await rateRepository.createQueryBuilder().where("( partnersId = :partner AND price = :price )  OR ( partnersId = :partner AND day = :day )",{
            partner : partnerRateDto.partners,
            price   : partnerRateDto.price,
            day     : partnerRateDto.day
        }).getCount();

        if(rateExists == 0) {

            try {

                const newRate = rateRepository.create({...partnerRateDto,isActive : 1} as any);
                const result  = await rateRepository.save(newRate);
              
                message.code = 200;
                message.message = "Rate created successfully !";
                message.returnObject = result;

            }catch(Exception) {
                message.message = Exception.message;
                message.code = 500;
            }
           
            return message;
        }

        message.code = 500;
        message.message = "Rate already exists !"; 
        return message;
    }

   /********************************************************/ 
   /*                     GET PARTNERS                     */
   /********************************************************/

    async getPartners() {
        let message = new ReturnMessage();
        try {
            const result = await partnersRepository.find();
            message.code = OK;
            message.returnObject = result;
  
         }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
         }
  
         return message; 
    }


    /********************************************************/ 
    /*                   GET PARTNER BY NAME                */
    /********************************************************/

    async getPartnerByFullName(query : string){

        let message = new ReturnMessage();

        try {

            const result = await partnersRepository.createQueryBuilder().where(`fullName LIKE '%${query}%' OR description LIKE '%${query}%' `).getMany();
            message.code = OK;
            message.returnObject = result;
  
         }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
         }
  
         return message; 
    }

   /********************************************************/ 
   /*                   GET PARTNER BY ID                  */
   /********************************************************/

    async getPartnerById(id) {

        let message = new ReturnMessage();

        try 
        {

            const partner = await partnersRepository.findOne({
                where : {id }
            });

             const rate = await partnersRepository.createQueryBuilder('partners')
             .select("r.price as price,r.day as day , r.id  as id ")
             .where('partners.id = :id' , {id})
             .innerJoin(Rate,'r',"partners.id = r.partnersId")
             .getRawMany();
        
            message.code = OK;
            message.returnObject = {
                ...partner,
                rate : [ ...rate]
            };
  
        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }
  
        return message; 
    }


   

}