import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsOptional } from 'class-validator';

export class updateMovieDto {
    @IsOptional()
    @IsString()
    public movieId: string;

    @IsOptional()
    @IsString()
    public title: string;

    @IsOptional()
    @IsString()
    public genre: string;

    @IsOptional()
    @IsNumber()
    public duration: number;

    @IsOptional()
    @IsNumber()
    public rating: number;

    @IsOptional()
    @IsString()
    public posterImg: string;

    @IsOptional()
    @IsString()
    public expiryDate: string;

    @IsOptional()
    @IsString()
    public theaterId: string;
}