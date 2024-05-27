import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createSeatDto } from './dto/createSeats.dto';

@Injectable()
export class seatDb {
    constructor(private readonly prisma:PrismaService){}
    createSeat(dto:createSeatDto){
        const {theaterId,seatNumber,availability,showtimeId} = dto
        return this.prisma.seat.create({
            data:{
                theaterId,seatnumber:seatNumber,availability,showtimeId
            }
        })
    }

    getShowtimeSeats(showtimeId:string){
        return this.prisma.seat.findMany({
            where:{
                showtimeId:showtimeId
            }
        })
    }

    getAvailableSeats(showtimeId:string){
        return this.prisma.seat.findMany({
            where:{
                showtimeId:showtimeId,
                availability:true
            }
        })
    }

    getUnAvailableSeats(showtimeId:string){
        return this.prisma.seat.findMany({
            where:{
                showtimeId:showtimeId,
                availability:false
            }
        })
    }

    updateSeatStatus(id:string,seatnumber:number){
        return this.prisma.seat.update({
            where: { id, seatnumber}, 
            data: { availability: false }
          });
    }
}