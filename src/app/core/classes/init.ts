
import { AppDataSource } from "../../database/data-source";

export  class DatabaseSourceManager {

    private static  INSTANCE : DatabaseSourceManager;

    private constructor(){
      this.initializeDB();
    }

    public static getInstance() {
        
        if(this.INSTANCE == null || this.INSTANCE == undefined)  {
            console.log("this.INSTANCE 1" + this.INSTANCE);
            return this.INSTANCE = new DatabaseSourceManager();
        } 
       
        console.log("this.INSTANCE 2" + this.INSTANCE);
        return this.INSTANCE;
    }

    source() {
        return AppDataSource;
    }

    async initializeDB() {
        return await AppDataSource//.initialize();
    }
}

