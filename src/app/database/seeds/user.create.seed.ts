import { Connection, DataSource, getManager } from "typeorm";
import { UserRoles } from "../../modules/roles/dto/role.dto";
import { User } from "../../entities/User";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserDto } from "../../modules/user/dto/user.dto";

export class UserCreateSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const userData : UserDto = {
      firstname: "Amitav Roy",
      lastname: "koua",
      email: "reachme@amitavroy.com",
      password: "Password@123",
      phone : "1",
      roleId: UserRoles.ADMIN,
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
