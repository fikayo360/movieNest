import { Injectable } from '@nestjs/common';
import { createTheaterDto } from './dto/createTheater';
import { theaterRepo } from './theater.respositories';
import { Logger } from '@nestjs/common';

@Injectable()
export class TheaterService {
    constructor(private readonly db:theaterRepo){}

    async createTheater(dto:createTheaterDto){
        await this.db.createTheater(dto)
        // this.logger.log('theater created successfully')
        return 'theater created successfully'
    }

    async deleteTheater(id:string){
        await this.db.deleteTheater(id)
        console.log(id)
        return 'theater deleted successfully'
        
    }

    async getAllTheater(){
        const theaters = await this.db.getAllTheaters()
        return theaters
    }

    async getTheater(id:string){
       const theater =  await this.db.getSingle(id)
       return theater
    }

}
