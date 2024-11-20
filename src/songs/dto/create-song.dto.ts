import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    cim: string;

    @IsNotEmpty()
    @IsString()
    szerzo: string;

    @IsNotEmpty()
    @IsNumber()
    hossz: number;

    @IsNotEmpty()
    @IsNumber()
    ar: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    ertekel: number;
}
