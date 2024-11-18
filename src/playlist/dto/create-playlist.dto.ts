import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    nev: string;
}
