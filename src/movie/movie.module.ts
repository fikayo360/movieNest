import { Module,Logger } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { movieDB } from './movie.respository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService,Logger,movieDB,PrismaService],
})
export class MovieModule {}
