import { Module,Logger } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  controllers: [BookingController],
  providers: [BookingService,Logger],
})
export class BookingModule {}
