
import { BookingService } from './booking.service';
import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param} from '@nestjs/common';
import { createBookingDto } from './dto/createBookingSchema';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  @HttpCode(HttpStatus.OK)
  createBooking(@Body() dto:createBookingDto){
    return this.bookingService.createBookings(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('verifyBooking/:id')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Param('id') id:string){
    return this.bookingService.getShowtimeSeats(id)
  }
}
