import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherEntity } from 'src/database/entities/publisher.entity';
import { GameService } from 'src/game/game.service';
import { CreatePublisherDto } from 'src/shared/dtos/publisher.dto';
import { Publisher } from 'src/shared/interfaces/publisher.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
    private readonly gameService: GameService,
  ) {}

  async createPublisher(
    id: string,
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const { name, siret } = createPublisherDto;
    const existingPublisher = await this.findPublisherByNameOrSiret(
      name,
      siret,
    );
    if (existingPublisher) {
      throw new HttpException(
        'Publisher with title or siret already exists',
        HttpStatus.CONFLICT,
      );
    }

    const gameResult = await this.gameService.findGameById(id);
    const newPublisher = await this.publisherRepository.save(
      createPublisherDto,
    );
    gameResult.publisherId = newPublisher.id;
    await this.gameService.saveGame(gameResult);
    await this.publisherRepository.save(newPublisher);

    return newPublisher;
  }

  async findPublisherById(id: string): Promise<PublisherEntity> {
    const foundPubllisher = await this.publisherRepository.findOne({ id });
    if (!foundPubllisher) {
      throw new HttpException(
        'Publisher resource not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundPubllisher;
  }

  async findPublisherByNameOrSiret(
    name: string,
    siret: number,
  ): Promise<PublisherEntity> {
    return await this.publisherRepository.findOne({
      where: [{ name }, { siret }],
    });
  }
}
