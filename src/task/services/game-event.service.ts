import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/database/entities/game.entity';
import { Repository } from 'typeorm';
import { GameDiscountPayload } from '../interfaces/game-discount';
import { DiscountUtil } from '../utils/discount.utils';
import { TimeService } from './time.service';

@Injectable()
export class GameEventHandlerService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    private readonly timeService: TimeService,
    private readonly discountUtil: DiscountUtil,
  ) {}

  @OnEvent('games.releasedate.eighteenplus.delete')
  async handleGamesEithteenPlusDelete() {
    const games = await this.getGamesOlderThanEighteenMonths();
    if (!games.length) {
      return;
    }
    await this.gameRepository.remove(games, { chunk: 5 });
  }

  @OnEvent('games.price.20%discount')
  async handleGamePriceDiscount(payload: GameDiscountPayload) {
    const { percent } = payload;
    const games = await this.getGamesBetweenTwelveAndEithTeenMonths();
    if (!games.length) {
      return;
    }
    Promise.all(
      games.map(async (game) => {
        const { id, price } = game;
        await this.gameRepository.update(
          { id },
          {
            ...game,
            discounted: true,
            price: this.discountUtil.getDiscountAmount(price, percent),
          },
        );
      }),
    );
  }

  private async getGamesBetweenTwelveAndEithTeenMonths(): Promise<
    GameEntity[]
  > {
    return await this.gameRepository.find({
      where: {
        discounted: false,
        releaseDate: this.timeService.isBetweenTwelveAndEighteenMonths(
          new Date(),
        ),
      },
    });
  }

  private async getGamesOlderThanEighteenMonths(): Promise<GameEntity[]> {
    return await this.gameRepository.find({
      where: {
        releaseDate: this.timeService.isEighteenMonghtsOlder(new Date()),
      },
    });
  }
}
