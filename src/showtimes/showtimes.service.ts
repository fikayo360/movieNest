import { Injectable } from '@nestjs/common';
import { Showtimes } from './types/showtimes';
import { showtimeDB } from './showtimes.respository';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ShowtimesService {
    constructor(private readonly db:showtimeDB,private pr:PrismaService,){}
    async createShowtimes(dto:Showtimes):Promise<string>{
        await this.db.createShowtime(dto)
        // this.logger.log('created succesfully')
        return 'created succesfully'
    }

    async getShowtimes(movieId:string):Promise<any>{
        const results = await this.db.getShowtimes(movieId)
        return results
    }

    async deleteShowtimes(id:string){
        await this.db.deleteShowtimes(id)
        // this.logger.log(`showtime with id: ${id} deleted succesfully`)
        return `showtime with id: ${id} deleted succesfully`
    }

    async createShowtimesSeats(theaterId:string,showtimeId:string){
        const noOfSeats = 100
        for(let i=1;i<=noOfSeats;i++){
            await this.pr.seat.create({
                data:{
                    theaterId,
                    seatnumber: i,
                    availability: true,
                    showtimeId
                }
            })
        }
    }

}
