import { Module,Logger } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { showtimeDB } from './showtimes.respository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ShowtimesController],
  providers: [ShowtimesService,Logger,showtimeDB,PrismaService],
})
export class ShowtimesModule {}
