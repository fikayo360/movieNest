import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsDate } from 'class-validator';

export class createMovieDto {
    
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public genre: string;

    @IsNotEmpty()
    @IsNumber()
    public duration: number;

    @IsNotEmpty()
    @IsNumber()
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