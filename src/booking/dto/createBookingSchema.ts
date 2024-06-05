import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class createBookingDto {

    @IsNotEmpty()
    @IsString()
    public userId: string;

    @IsNotEmpty()
    @IsNumber()
    public seatnumber: number;

    @IsNotEmpty()
    @IsNumber()
    public totalPrice: number;

    @IsNotEmpty()
    @IsString()
    public showtimeId: string;
}