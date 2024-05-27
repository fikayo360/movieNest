import { Module,Logger } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService,Logger],
})
export class SeatsModule {}
