import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.orm-entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        let user: UserEntity | undefined = await this.findOne({ email });
        return user;
    }
    async userExists(email: string): Promise<Boolean> {
        let found = await this.findOneByEmail(email);
        if (found) {
            return true;
        } else {
            return false;
        }
    }

    async findOneByUsername(username:string) {
        let user: UserEntity |  undefined = await this.findOne({ where: {username: username}})
        return user;
    }
}
