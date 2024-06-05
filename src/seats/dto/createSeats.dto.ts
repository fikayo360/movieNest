import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class createSeatDto {

    @IsNotEmpty()
    @IsString()
    public theaterId: string;

    @IsNotEmpty()
    @IsNumber()
    public seatnumber: number;

    @IsOptional()
    @IsBoolean()
    public availability: boolean;

    @IsNotEmpty()
    @IsString()
    public showtimeId: string;

}