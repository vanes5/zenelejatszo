import { IsInt, IsNotEmpty, IsNumber, IsString, Matches, Max, Min } from "class-validator";

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

    @IsInt()
    @Min(1)
    @Max(5)
    ertekel: number;
}
