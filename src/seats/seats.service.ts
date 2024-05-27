import { Injectable } from '@nestjs/common';
import { createSeatDto } from './dto/createSeats.dto';
import { seatDb } from './seats.repositories';
import { SeatType } from './types/seats.types';
import { Logger } from '@nestjs/common';

@Injectable()
export class SeatsService {
    constructor(private readonly db:seatDb,private logger:Logger){}
    async createSeat(dto:createSeatDto):Promise<string>{
        await this.db.createSeat(dto)
        this.logger.log('seat created succesfully')
        return 'seat created successfully'
    }

    async getShowtimeSeats(showtimeId:string):Promise<SeatType[]>{
        const seats = await this.db.getShowtimeSeats(showtimeId)
        return seats
    }

    async getAvailableSeats(showtimeId:string):Promise<SeatType[]>{
        const seats = await this.db.getAvailableSeats(showtimeId)
        return seats

    }

    async getUnAvailableSeats(showtimeId:string):Promise<SeatType[]>{
        const seats = await this.db.getUnAvailableSeats(showtimeId)
        return seats
    }

    async chooseSeats(id:string, seatNo:number){
        await this.db.updateSeatStatus(id, seatNo)
    }
}
