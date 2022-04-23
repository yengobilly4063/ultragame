import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/database/entities/game.entity';
import { PublisherService } from 'src/publisher/publisher.service';
import { CreateGameDto, UpdateGameDto } from 'src/shared/dtos/game.dto';
import { CreatePublisherDto } from 'src/shared/dtos/publisher.dto';
import { DeleteResponse } from 'src/shared/interfaces/delete-response.interface';
import { Game } from 'src/shared/interfaces/game.interface';
import { Publisher } from 'src/shared/interfaces/publisher.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @Inject(forwardRef(() => PublisherService))
    private readonly publisherService: PublisherService,
  ) {}

  async findAllGames(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOneGame(id: string): Promise<Game> {
    return await this.findGameById(id);
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { title } = createGameDto;
    const foundGame = await this.findGameByTitle(title);
    if (foundGame) {
      throw new HttpException(
        'Game resource with title already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newGame = this.gameRepository.create(createGameDto);
    await this.gameRepository.save(newGame);
    return newGame;
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const { publisherId } = updateGameDto;
    if (publisherId) {
      await this.publisherService.findPublisherById(publisherId);
    }
    await this.findGameById(id);
    const newGame = { id, ...updateGameDto };

    return await this.gameRepository.save(newGame);
  }

  async saveGame(game: GameEntity): Promise<GameEntity> {
    return await this.gameRepository.save(game);
  }

  async createPublisher(
    id: string,
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return await this.publisherService.createPublisher(id, createPublisherDto);
  }

  async findGamePublisher(gameId: string): Promise<Publisher> {
    const foundGame = await this.findGameById(gameId);
    const { publisherId } = foundGame;
    return this.publisherService.findPublisherById(publisherId);
  }

  async deleteGame(id: string): Promise<DeleteResponse> {
    const deleteResult = await this.gameRepository.delete({ id });
    return deleteResult.affected > 0 ? { success: true } : { success: false };
  }

  async findGameById(id: string): Promise<GameEntity> {
    const game = await this.gameRepository.findOne({ id });
    if (!game) {
      throw new HttpException('Game resourse not found', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  async findGameByTitle(title: string) {
    return await this.gameRepository.findOne({ title });
  }
}
