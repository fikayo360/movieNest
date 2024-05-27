import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createMovieDto,updateMovieDto } from './dto';

@Injectable()
export class movieDB {
    constructor(private readonly prisma:PrismaService){}

    createMovie(dto:createMovieDto){
        const {title,genre,duration,expiryDate,rating,posterImg,theaterId} = dto
        return this.prisma.movie.create(
            {
                data:{
                    title,genre,duration,expiryDate,rating,posterimg:posterImg,theaterId
                }
              }
        )
    }

    updateMovie(dto:updateMovieDto,movieId:string){
        return this.prisma.movie.update({
            where:{
              id:movieId
            },
            data:dto
          })
    }

    deleteMovie(movieId:string){
        return this.prisma.movie.delete({
            where:{
                id:movieId
            }
        })
    }

    findAllMovies(){
        return this.prisma.movie.findMany()
    }


    getMoviesByTitle(title:string){
        return this.prisma.movie.findMany({
            where:{
                title:title
            }
        })
    }

    
    getMoviesByDuration(duration:number){
        return this.prisma.movie.findMany({
            where:{
                duration:duration
            }
        })
    }

    
    getMoviesByRating(rating:number){
        return this.prisma.movie.findMany({
            where:{
                rating:rating
            }
        })
    }

    getMoviesByGenre(genre:string){
        return this.prisma.movie.findMany({
            where:{
                genre:genre
            }
        })
    }

    getMoviesByTheater(theaterId:string){
        return this.prisma.movie.findMany({
            where:{
                theaterId:theaterId
            }
        })
    }
}