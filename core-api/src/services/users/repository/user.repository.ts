import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/user.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class UserRepository extends DddRepository<User> {
  entityClass = User;

  async find(conditions: { id?: string; username?: string }, options?: TypeormRelationOptions<User>) {
    return await this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        username: conditions.username,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: string; username?: string }) {
    return await this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        username: conditions.username,
      }),
    });
  }
}
