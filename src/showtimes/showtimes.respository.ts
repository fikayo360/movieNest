import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createShowtimesDto } from './dto';

@Injectable()
export class showtimeDB {
    constructor(private readonly prisma:PrismaService){}

    createShowtime(dto:createShowtimesDto){
        const {movieId, theaterId, startTime, endTime} = dto
        return this.prisma.showtime.create({
            data:{
                movieId, theaterId, startTime, endTime
            }
        })
    }

    getShowtimes(movieId:string){
        return this.prisma.showtime.findMany({
            where:{
                 movieId:movieId
            }
        })
    }

    deleteShowtimes(id:string){
        return this.prisma.showtime.delete({
            where:{
                id:id
            }
        })
    }
}