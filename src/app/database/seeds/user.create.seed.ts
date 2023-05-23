import { Connection, DataSource, getManager } from "typeorm";
import { User } from "../../entities/User";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserDto } from "../../modules/user/dto/user.dto";
import { Role } from "../../entities/Role";
import { hash } from "../../common/plugins/encryption/encryption";

export class UserCreateSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const role =  await roleRepository.findOneBy({
      flag : 1
    });

    
    if(!!role) {

      const userData : UserDto = {
        firstname: "Amitav Roy",
        lastname: "koua",
        email: "reachme@amitavroy.com",
        password: hash("Password@123"),
        phone : "1",
        role: role.id,
      };
  
      const userExists = await userRepository.findOneBy({
        email: userData.email,
      });
  
      if (!userExists) {
        const newUser = userRepository.create(userData as any);
        await userRepository.save(newUser);
      }
    }
   
  }
}
