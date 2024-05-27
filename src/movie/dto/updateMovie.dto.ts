import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class updateMovieDto {
    @IsNotEmpty()
    @IsString()
    public id: string;

    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public genre: string;

    @IsNotEmpty()
    @IsString()
    public duration: number;

    @IsNotEmpty()
    @IsString()
    public rating: number;

    @IsNotEmpty()
    @IsString()
    public posterImg: string;

    @IsNotEmpty()
    @IsString()
    public expiryDate: string;

    @IsNotEmpty()
    @IsString()
    public theaterId: string;
}