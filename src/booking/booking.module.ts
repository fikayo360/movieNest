import { Module,Logger } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { bookingDB } from './booking.respositories';

@Module({
  controllers: [BookingController],
  providers: [BookingService,Logger,PrismaService,bookingDB],
})
export class BookingModule {}
