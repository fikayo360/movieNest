import { IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class refreshToken {

    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public rt: string;
}