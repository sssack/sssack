import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UserRepository } from '../repository/user.repository';
import { Transactional } from '@libs/decorators';
import { User } from '../domain/user.entity';
import { JwtHelperService } from '@common/jwt';

@Injectable()
export class GeneralUserService extends DddService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtHelperService: JwtHelperService
  ) {
    super();
  }

  @Transactional()
  async signUp({ username, password }: { username: string; password: string }) {
    const [existedUser] = await this.userRepository.find({ username });

    if (existedUser) {
      throw new BadRequestException(`${username}의 닉네임은 이미 존재합니다.`, { cause: '중복된 닉네임입니다.' });
    }

    const user = new User({ username, password });
    await this.userRepository.save([user]);
  }

  async signIn({ username, password }: { username: string; password: string }) {
    const [user] = await this.userRepository.find({ username });

    if (!user) {
      throw new BadRequestException(`${username}의 닉네임은 존재하지 않습니다.`, {
        cause: '존재하지 않는 닉네임입니다.',
      });
    }

    if (user.password !== password) {
      throw new BadRequestException(`${username}의 비밀번호가 일치하지 않습니다.`, {
        cause: '비밀번호가 일치하지 않습니다.',
      });
    }

    const accessToken = await this.jwtHelperService.signAccessToken({ id: user.id });

    return { accessToken };
  }
}
