import { Module,Logger } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { seatDb } from './seats.repositories';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService,Logger,seatDb,PrismaService],
})
export class SeatsModule {}
