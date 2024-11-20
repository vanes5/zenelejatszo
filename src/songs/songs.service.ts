import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SongsService {
  db: PrismaService;
  constructor(db: PrismaService){
    this.db = db;
  }
  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto
    });
  }

  async findAll() {
    return await this.db.song.findMany();
  }

  findOne(id: number) {
    return this.db.song.findUnique({
      where:{
        id
      }
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    try {
      return await this.db.song.update({
        where:{
          id
        },
        data: updateSongDto
      });
    } catch{
      return undefined
    }
  }

  async remove(id: number) {
    try{
      return await this.db.song.delete({
        where: {
          id
        }
      })
    } catch{
      return undefined
    }
  }

  async getFree(){
    try{
      return await this.db.song.findMany({
        where: {
          ar: 0
        }
      })
    } catch{
      return undefined;
    }
  }

  async getTop(count?: number){
    if(count){
      return this.db.song.findMany({
        orderBy: {
          ertekel: 'desc'
        },
        take: count
      })
    }
    else{
      return this.db.song.findMany({
        orderBy: {
          ertekel: 'desc'
        },
        take: 10
      })
    }
  }

  async getArtists(){
    try{
      return (await this.db.song.groupBy({
        by: ['szerzo'],
        _count: {
          szerzo: true
        },
        orderBy: {
          _count : {
            szerzo: 'desc',
          }
        }
      })).map(e => ({ szerzo: e.szerzo, db: e._count.szerzo }))

    } catch{
      return undefined;
    }
  }
}
