import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete, Query, Patch} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatType } from './types/seats.types';
import { createSeatDto } from './dto/createSeats.dto';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  createSeat(@Body() dto:createSeatDto) {
    return this.seatsService.createSeat(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('allSeats/:showtimeId')
  @HttpCode(HttpStatus.OK)
  getShowtimeSeats(@Param('showtimeId') showtimeId:string) {
    return this.seatsService.getShowtimeSeats(showtimeId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('avilableSeats/:showtimeId')
  @HttpCode(HttpStatus.OK)
  getAvailableSeats(@Param('showtimeId') showtimeId:string) {
    return this.seatsService.getAvailableSeats(showtimeId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('unAvilableSeats/:showtimeId')
  @HttpCode(HttpStatus.OK)
  getUnavailableSeats(@Param('showtimeId') showtimeId:string) {
    return this.seatsService.getUnAvailableSeats(showtimeId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('chooseSeats')
  @HttpCode(HttpStatus.OK)
  chooseSeats(@Body('id') id:string, @Body('seatNumber') seatNumber:number ){
    return this.seatsService.chooseSeats(id,seatNumber)
  }

}
