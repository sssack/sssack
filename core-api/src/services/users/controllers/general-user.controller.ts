import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSignInDto } from './dto';

@ApiTags('[사용자] 유저 API')
@Controller('users')
export class GeneralUserController {
  /**
   * 회원 가입
   */
  @Post('sign-in')
  async signIn(@Body() body: UserSignInDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return { data: {} };
  }
}
