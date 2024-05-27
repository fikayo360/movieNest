import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Theater } from '@prisma/client';
import { createTheaterDto } from './dto';

@Injectable()
export class theaterRepo {
    constructor(private readonly prisma:PrismaService){}

    createTheater(dto:createTheaterDto){
        const {name,location,seatingCapacity} = dto
        return this.prisma.theater.create({
            data:{
                name:name,location:location,seatingCapacity:seatingCapacity
            }
        })
    }

    deleteTheater(id:string){
        return  this.prisma.theater.delete({
            where: {
                id:id,
            },
          })
    }

    getAllTheaters(){
        return this.prisma.theater.findMany()
    }

    getSingle(id:string){
        return this.prisma.theater.findUnique({
            where:{
                id:id,
            }
        })
    }
}