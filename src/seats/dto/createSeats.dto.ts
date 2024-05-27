import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class createSeatDto {

    @IsNotEmpty()
    @IsString()
    public theaterId: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public seatnumber: number;

    @IsNotEmpty()
    @IsString()
    public availability: boolean;

    @IsNotEmpty()
    @IsString()
    public showtimeId: string;

}