
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class createShowtimesDto {
    @IsNotEmpty()
    @IsString()
    public movieId: string;
    
    @IsNotEmpty()
    @IsString()
    public theaterId: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public startTime: any;

    @IsNotEmpty()
    @IsString()
    public endTime: any;
}