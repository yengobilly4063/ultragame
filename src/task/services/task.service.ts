import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from 'eventemitter2';
import { GameDiscountPayload } from '../interfaces/game-discount';

@Injectable()
export class TaskService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  triggerGameDeleteEvent() {
    this.eventEmitter.emit('games.releasedate.eighteenplus.delete');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  triggerGameDiscountEvent() {
    const payload: GameDiscountPayload = { percent: 20 };
    this.eventEmitter.emit('games.price.20%discount', payload);
  }
}
