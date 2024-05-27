import { Injectable } from '@nestjs/common';
import { createTheaterDto } from './dto/createTheater';
import { theaterRepo } from './theater.respositories';
import { Logger } from '@nestjs/common';

@Injectable()
export class TheaterService {
    constructor(private readonly db:theaterRepo,private logger:Logger){}

    async createTheater(dto:createTheaterDto){
        await this.db.createTheater(dto)
        this.logger.log('theater created successfully')
        return 'theater created successfully'
    }

    async deleteTheater(id:string){
        await this.db.deleteTheater(id)
        
    }

    async getAllTheater(){
        await this.db.getAllTheaters()
    }

    async getTheater(id:string){
        await this.db.getSingle(id)
    }

}
