import { Injectable } from '@nestjs/common';
import { bookingDB } from './booking.respositories';
import { createBookingDto } from './dto/createBookingSchema';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookingService {
    constructor(private readonly db:bookingDB,){}
    async createBookings(dto:createBookingDto):Promise<string>{
        await this.db.createBooking(dto)
        // this.logger.log(`Bookings created succesfully`)
        return 'booking created successfully'
    }

    async verifyBooking(id:string):Promise<any>{
        const bookings = await this.db.getBookingById(id)
        if(!bookings) return 'booking not found'
        return {bookings,data:"booking verified successfully good to go"}
    }
}
