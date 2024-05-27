import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createBookingDto } from './dto/createBookingSchema';

@Injectable()

export class bookingDB{
    constructor(private readonly prisma:PrismaService){}
    createBooking(dto:createBookingDto){
        const {userId,theaterId,showtimeId,seatnumber,availability} = dto
        return this.prisma.booking.create({
            data:{
                userId,theaterId,showtimeId,seatnumber,availability
            }
        })
    }

    getBookingById(id:string){
        return this.prisma.booking.findUnique({
            where:{
                id:id,
            }
        })
    }
}