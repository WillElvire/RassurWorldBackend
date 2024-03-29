import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../entities/Role';
import { RoleDto, UserRoles } from '../../modules/roles/dto/role.dto';

export class RoleCreatedSeed implements Seeder {

    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
       
        const roleRepository  = dataSource.getRepository(Role);
        
        const admin : Omit<RoleDto,'id'> = {
            flag : UserRoles.ADMIN,
            libelle : "admin"
        }
        const member : Omit<RoleDto , 'id'> = {
            flag : UserRoles.MEMBER,
            libelle : "member"
        }
        const customer : Omit<RoleDto , 'id'> = {
            flag : UserRoles.CUSTOMER,
            libelle : "customer"
        }

        const apporteur : Omit<RoleDto , 'id'> = {
            flag : UserRoles.APPORTEUR,
            libelle : "apporteur"
        }

        const roles = [{...admin} , {...member},{...customer},{...apporteur}];

        console.log(roles);

        roles.forEach((role) =>  {
            roleRepository.findOneBy({
                flag : role.flag
            }).then((response)=> {
                if(!response) {
                    const newRole = roleRepository.create(role as any);
                    roleRepository.save(newRole);
                }
            })
        })
    }
    
}