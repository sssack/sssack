import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UserRepository } from '../repository/user.repository';
import { Transactional } from '@libs/decorators';
import { User } from '../domain/user.entity';

@Injectable()
export class GeneralUserService extends DddService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  @Transactional()
  async signIn({ username, password }: { username: string; password: string }) {
    const [existedUser] = await this.userRepository.find({ username });

    if (existedUser) {
      throw new BadRequestException(`${username}의 닉네임은 이미 존재합니다.`, { cause: '중복된 닉네임입니다.' });
    }

    const user = new User({ username, password });
    await this.userRepository.save([user]);
  }
}
