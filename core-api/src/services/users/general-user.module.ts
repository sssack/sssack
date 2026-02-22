import { Module } from '@nestjs/common';
import { GeneralUserController } from './controllers/general-user.controller';
import { GeneralUserService } from './applications/general-user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [GeneralUserController],
  providers: [GeneralUserService, UserRepository],
  exports: [GeneralUserService, UserRepository],
})
export class GeneralUserModule {}
