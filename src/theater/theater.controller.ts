import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param, Delete} from '@nestjs/common';
import { TheaterService } from './theater.service';
import { createTheaterDto } from './dto/createTheater';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @UseGuards(JwtAuthGuard)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  createTheater(@Body() dto:createTheaterDto){
    return this.theaterService.createTheater(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  deleteTheater(@Param('id') id:string){
     return this.theaterService.deleteTheater(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  getAllTheaters(){
    return this.theaterService.getAllTheater()
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  getSingle(@Param('id') id:string){
    return this.theaterService.getTheater(id)
  }

}
