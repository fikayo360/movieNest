import { Injectable } from '@nestjs/common';
import {createMovieDto,updateMovieDto} from './dto/index'
import { movieDB } from './movie.respository';
import { Movie } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class MovieService {
    constructor(private readonly db:movieDB){}
    async createMovie(dto:createMovieDto):Promise<string>{
        await this.db.createMovie(dto)
        // this.logger.log('movie created successfully')
        return 'movie created successfully'
    }

    async updateMovie(dto:updateMovieDto):Promise<string>{
        console.log(dto)
        const updatedMovie = await this.db.updateMovie(dto)
        // this.logger.log(`Movie with id:${movieId} updated successfully`)
        return `Movie with id:${updatedMovie.id} updated successfully`
    }

    async deleteMovie(movieId:string):Promise<string>{
        await this.db.deleteMovie(movieId)
        // this.logger.log(`Movie with id:${movieId} deleted successfully`)
        return `Movie with id:${movieId} deleted successfully`
    }

    async searchMovie(queryItems:any):Promise<any>{
        console.log(queryItems)
        const {title,duration,genre,rating} = queryItems
        let searchResults;

        if(title){
              searchResults = await this.db.getMoviesByTitle(title)
              if (!searchResults) return `movie with title ${title} not found`
        }
        
        if(duration){
            searchResults = await this.db.getMoviesByDuration(duration)
            if (!searchResults) return `movie with duration ${duration} not found`
        }

        if(rating){
            searchResults = await this.db.getMoviesByRating(rating)
            if (!searchResults) return `movie with rating ${rating} not found`
        }
        if(genre){
            searchResults = await this.db.getMoviesByGenre(genre)
            if (!searchResults) return `movie with genre ${genre} not found`
        }

        if(!duration || !rating ||genre){
            searchResults = await this.db.findAllMovies()
        }

        return searchResults
    }

    async getMoviesByTheater(tid:string):Promise<Movie[]>{
        const results = await this.db.getMoviesByTheater(tid)
        return results
    }
}
