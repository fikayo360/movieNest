import { Module,Logger } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';

@Module({
  controllers: [TheaterController],
  providers: [TheaterService,Logger],
})
export class TheaterModule {}
