import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from 'src/shared/dtos/game.dto';
import { CreatePublisherDto } from 'src/shared/dtos/publisher.dto';
import { DeleteResponse } from 'src/shared/interfaces/delete-response.interface';
import { Game } from 'src/shared/interfaces/game.interface';
import { Publisher } from 'src/shared/interfaces/publisher.interface';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAllGames(): Promise<Game[]> {
    return this.gameService.findAllGames();
  }

  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gameService.createGame(createGameDto);
  }

  @Get(':id')
  findOneGame(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOneGame(id);
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string): Promise<DeleteResponse> {
    return this.gameService.deleteGame(id);
  }

  @Patch(':id')
  updateGame(
    @Param('id') gameId: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.updateGame(gameId, updateGameDto);
  }

  @Get(':id/publisher')
  findGamePublisher(@Param('id') gameId: string): Promise<Publisher> {
    return this.gameService.findGamePublisher(gameId);
  }

  @Post(':id/publisher')
  createPublisher(
    @Body() createPublisherDto: CreatePublisherDto,
    @Param('id') id: string,
  ): Promise<Publisher> {
    return this.gameService.createPublisher(id, createPublisherDto);
  }
}
