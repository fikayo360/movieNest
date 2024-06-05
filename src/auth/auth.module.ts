import { Module,Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authDB } from './auth.respository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AtStrategy } from 'src/shared/strategies/at.strategy';
import { RtStrategy } from 'src/shared/strategies/rt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,Logger,authDB,PrismaService,JwtService,AtStrategy,RtStrategy],
})
export class AuthModule {}
