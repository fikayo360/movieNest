import { Injectable } from '@nestjs/common';
import {createMovieDto,updateMovieDto} from './dto/index'
import { movieDB } from './movie.respository';
import { Movie } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class MovieService {
    constructor(private readonly db:movieDB,private logger:Logger){}
    async createMovie(dto:createMovieDto):Promise<string>{
        await this.db.createMovie(dto)
        this.logger.log('movie created successfully')
        return 'movie created successfully'
    }

    async updateMovie(dto:updateMovieDto,movieId:string):Promise<string>{
        await this.db.updateMovie(dto,movieId)
        this.logger.log(`Movie with id:${movieId} updated successfully`)
        return `Movie with id:${movieId} updated successfully`
    }

    async deleteMovie(movieId:string):Promise<string>{
        await this.db.deleteMovie(movieId)
        this.logger.log(`Movie with id:${movieId} deleted successfully`)
        return `Movie with id:${movieId} deleted successfully`
    }

    async searchMovie(movieQuery:any):Promise<Movie[]>{
        const title = movieQuery.title
        const duration = movieQuery.duration
        const rating = movieQuery.rating
        const genre = movieQuery.genre
        let searchResults;

        if(title){
              searchResults = await this.db.getMoviesByTitle(title)
        }
        if(duration){
            searchResults = await this.db.getMoviesByDuration(duration)
        }
        if(rating){
            searchResults = await this.db.getMoviesByRating(rating)
        }
        if(genre){
            searchResults = await this.db.getMoviesByGenre(genre)
        }

        searchResults = await this.db.findAllMovies()
        return searchResults
    }

    async getMoviesByTheater(tid:string):Promise<Movie[]>{
        const results = await this.db.getMoviesByTheater(tid)
        return results
    }
}
