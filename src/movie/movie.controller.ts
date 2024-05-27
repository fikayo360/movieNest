import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete, Query} from '@nestjs/common';
import {createMovieDto,updateMovieDto} from './dto/index'
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  createMovie(@Body() dto:createMovieDto){
    return this.movieService.createMovie(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto:updateMovieDto){
    const movieId = dto.id
    return this.movieService.updateMovie(dto,movieId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:movieId')
  @HttpCode(HttpStatus.OK)
  deleteMovie(@Param('movieId') movieId:string ){
    return this.movieService.deleteMovie(movieId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  @HttpCode(HttpStatus.OK)
  searchMovie(@Query('movieQuery') movieQuery:any){
    return this.movieService.searchMovie(movieQuery)
  }

  @UseGuards(JwtAuthGuard)
  @Get('movie/:tId')
  @HttpCode(HttpStatus.OK)
  getMoviesByTheater(@Param('tId') tId:string ){
    return this.movieService.getMoviesByTheater(tId)
  }
}
