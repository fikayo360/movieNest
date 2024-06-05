import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete, Query,Patch} from '@nestjs/common';
import {createMovieDto,updateMovieDto} from './dto/index'
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/shared/guards';
import { title } from 'process';

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
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  update(@Body() dto:updateMovieDto){
    return this.movieService.updateMovie(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  @HttpCode(HttpStatus.OK)
  searchMovie(@Query('title') title, @Query('duration') duration, @Query('genre') genre, @Query('rating') rating){
    let queryItems = {title,duration,genre,rating}
    return this.movieService.searchMovie(queryItems)
  }

  @UseGuards(JwtAuthGuard)
  @Get('tmovies/:tId')
  @HttpCode(HttpStatus.OK)
  getMoviesByTheater(@Param('tId') tId:string ){
    return this.movieService.getMoviesByTheater(tId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:movieId')
  @HttpCode(HttpStatus.OK)
  deleteMovie(@Param('movieId') movieId:string ){
    return this.movieService.deleteMovie(movieId)
  }
}
