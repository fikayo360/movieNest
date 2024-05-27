import { IsNotEmpty, IsString} from 'class-validator';

export class createBookingDto {

    @IsNotEmpty()
    @IsString()
    public userId: string;

    @IsNotEmpty()
    @IsString()
    public theaterId: string;

    @IsNotEmpty()
    @IsString()
    public seatnumber: number;

    @IsNotEmpty()
    @IsString()
    public availability: boolean;

    @IsNotEmpty()
    @IsString()
    public showtimeId: string;
}