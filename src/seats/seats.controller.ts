import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete, Query} from '@nestjs/common';
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
  @Get('seats/:showtimeId')
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
  @Get('chooseSeats/:id')
  @HttpCode(HttpStatus.OK)
  chooseSeats(@Param('id') id:string,@Body() seatNumber:number ){
    return this.seatsService.chooseSeats(id,seatNumber)
  }

}
