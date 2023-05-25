import { AutoService } from "./auto.service";

const autoService = new AutoService();
export class AutoController {
    
  async firstStep(req , res ) {
    const result = await autoService.setupFirstStep(req.body);
    res.status(result.code).send(result);
  }

  secondStep(req,res){

  }

  thirdStep(req,res){
    
  }

}