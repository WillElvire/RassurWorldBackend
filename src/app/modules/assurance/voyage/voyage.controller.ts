import { VoyageService } from "./voyage.service";
const voyageService  = new VoyageService();
export class VoyageController {
      
  

  async firstStep(req,res) {
    const result = await voyageService.setupFirstStep(req.body);
    res.status(result.code).send(result);
  }

  secondStep(req,res){

  }

  thirdStep(req,res){

  }
}