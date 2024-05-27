import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete, Query} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { createShowtimesDto } from './dto';
import { Showtimes } from './types/showtimes';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}
  @UseGuards(JwtAuthGuard)
  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  createShowtime(@Body() dto:createShowtimesDto,showtimeId:string) {
    return this.showtimesService.createShowtimes(dto,showtimeId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('showtimes/:movieId')
  @HttpCode(HttpStatus.OK)
  getShowtimesForMovie(@Param('movieId') movieId:string) {
    return this.showtimesService.getShowtimes(movieId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  deleteMovie(@Param('id') id:string ){
    return this.showtimesService.deleteShowtimes(id)
  }
}
