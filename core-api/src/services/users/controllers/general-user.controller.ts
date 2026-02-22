import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSignInDto } from './dto';
import { GeneralUserService } from '../applications/general-user.service';
import { Context, ContextKey } from '@common/context';
import { User } from '../domain/user.entity';
import { UserGuard } from '@common/guards/user.guard';

@ApiTags('[사용자] 유저 API')
@Controller('users')
export class GeneralUserController {
  constructor(
    private readonly generalUserService: GeneralUserService,
    private readonly context: Context
  ) {}
  /**
   * 회원 가입
   */
  @Post('sign-up')
  async signUp(@Body() body: UserSignInDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.generalUserService.signUp({ ...body });

    // 4. Send response
    return { data };
  }

  @Post('sign-in')
  async singIn(@Body() body: any) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.generalUserService.signIn({ ...body });

    // 4. Send response
    return { data };
  }

  @Get('self')
  @UseGuards(UserGuard)
  self() {
    // 1. Destructure body, params, query
    // 2. Get context
    const user = this.context.get<User>(ContextKey.USER);

    // 3. Get result
    // 4. Send response
    return { data: user };
  }
}
