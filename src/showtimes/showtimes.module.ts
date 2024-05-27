import { Module,Logger } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';

@Module({
  controllers: [ShowtimesController],
  providers: [ShowtimesService,Logger],
})
export class ShowtimesModule {}
