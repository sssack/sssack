import { Global, Module } from '@nestjs/common';
import { ContextModule } from './context';
import { EventBoxModule } from './event-box';
import { JwtHelperModule } from './jwt';
import { GuardsModule } from './guards/guards.module';

@Global()
@Module({
  imports: [ContextModule, EventBoxModule, JwtHelperModule, GuardsModule],
  exports: [ContextModule, EventBoxModule, JwtHelperModule, GuardsModule],
})
export class CommonModule {}
