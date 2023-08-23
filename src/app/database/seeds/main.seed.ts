import { RoleCreatedSeed } from './role.create.seed';
import { DataSource } from 'typeorm'
import { runSeeder, runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension'
import { UserCreateSeed } from './user.create.seed'
import { OfferCreatedSeed } from './offer.create.seed';


export class MainSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		await runSeeders(dataSource,{seeds : [RoleCreatedSeed,UserCreateSeed]})
	    await runSeeder(dataSource,OfferCreatedSeed)
		//await runSeeder(dataSource, UserCreateSeed)
	}
}

export default MainSeeder;