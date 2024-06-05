import { Module,Logger } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { theaterRepo } from './theater.respositories';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TheaterController],
  providers: [TheaterService,Logger,theaterRepo,PrismaService],
})
export class TheaterModule {}
