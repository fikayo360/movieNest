import { Logger, Module } from '@nestjs/common';
import { TheaterModule } from './theater/theater.module';
import { MovieModule } from './movie/movie.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { SeatsModule } from './seats/seats.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [TheaterModule, MovieModule, ShowtimesModule, SeatsModule, AuthModule, BookingModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

  ],
  controllers: [],
  providers: [
      Logger,
       {
           provide: APP_GUARD,
           useClass: ThrottlerGuard
       }
  ],
})
export class AppModule {}
