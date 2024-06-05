import { Injectable } from '@nestjs/common';
import { createSeatDto } from './dto/createSeats.dto';
import { seatDb } from './seats.repositories';
import { SeatType } from './types/seats.types';
import { Logger } from '@nestjs/common';

@Injectable()
export class SeatsService {
    constructor(private readonly db:seatDb,){}
    async createSeat(dto:createSeatDto):Promise<string>{
        await this.db.createSeat(dto)
        // this.logger.log('seat created succesfully')
        return 'seat created successfully'
    }

    async getShowtimeSeats(showtimeId:string):Promise<any>{
        const seats = await this.db.getShowtimeSeats(showtimeId)
        if(seats.length === 0) return 'no seats found'
        return seats
    }

    async getAvailableSeats(showtimeId:string):Promise<any>{
        const seats = await this.db.getAvailableSeats(showtimeId)
        if(seats.length === 0) return 'no seats found'
        return seats
    }

    async getUnAvailableSeats(showtimeId:string):Promise<any>{
        const seats = await this.db.getUnAvailableSeats(showtimeId)
        if(seats.length === 0) return 'no seats found'
        return seats
    }

    async chooseSeats(id:string, seatNo:number){
        await this.db.updateSeatStatus(id, seatNo)
        return `seat ${seatNo} has been selected`
    }
}
