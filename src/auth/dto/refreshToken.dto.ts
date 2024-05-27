import { IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class refreshToken {

    @IsNotEmpty()
    @IsNumber()
    public userId: string;

    @IsNotEmpty()
    @IsString()
    public rt: string;
}