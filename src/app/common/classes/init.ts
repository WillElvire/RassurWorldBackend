import { runSeeders } from "typeorm-extension";
import { AppDataSource } from "../../database/data-source";

export class DatabaseSourceManager {
  private static INSTANCE: DatabaseSourceManager;

  private constructor() {
    this.initializeDB();
  }

  public static getInstance() {
    if (this.INSTANCE == null || this.INSTANCE == undefined) {
      return (this.INSTANCE = new DatabaseSourceManager());
    }
    return this.INSTANCE;
  }

  source() {
    return AppDataSource;
  }

  async initializeDB() {
    return await AppDataSource.initialize();
  }
}
