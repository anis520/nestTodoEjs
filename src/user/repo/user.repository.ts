import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getUserBySallary(sallary: number): Promise<User> {
    return this.findOne({
      where: {
        sallary: sallary,
      },
    });
  }
}
