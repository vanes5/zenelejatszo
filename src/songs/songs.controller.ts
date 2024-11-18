import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/free')
  async getFree(){
    const songs = await this.songsService.getFree();
    if(songs.length == 0) throw new NotFoundException('There are no free songs avaible');
    return songs
  }

  @Get('/popularArtists')
  async getArtists(){
    const artists = await this.songsService.getArtists();
    if(artists.length == 0) throw new NotFoundException('There are no songs in the database');
    return artists
  }

  @Get('/top')
  async getTop(){
    return await this.songsService.getTop();
  }

  @Get('/top/:id')
  async getTopId(@Param('id') id: string){
    return await this.songsService.getTop(+id);
  }


  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const song =  await this.songsService.findOne(+id);
    if (!song) throw new NotFoundException('No song with this id ' + id)
      return song;
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    const song = await this.songsService.update(+id, updateSongDto);
    if (!song){
      throw new NotFoundException('No song with this id'+ id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const song = await this.songsService.remove(+id);
    if(!song){
      throw new NotFoundException('No song with this id'+ id);
    }
  }
}
