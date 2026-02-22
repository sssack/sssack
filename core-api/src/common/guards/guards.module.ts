import { Module } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { GeneralUserModule } from '@services/users/general-user.module';

@Module({
  imports: [GeneralUserModule],
  providers: [UserGuard],
  exports: [UserGuard],
})
export class GuardsModule {}
