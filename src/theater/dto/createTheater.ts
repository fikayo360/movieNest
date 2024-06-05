import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class createTheaterDto {

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public location:string

    @IsNotEmpty()
    @IsNumber()
    public seatingCapacity:number
}