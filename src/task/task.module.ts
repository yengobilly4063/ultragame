import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from 'src/database/entities/game.entity';
import { GameEventHandlerService } from './services/game-event.service';
import { TaskService } from './services/task.service';
import { TimeService } from './services/time.service';
import { DiscountUtil } from './utils/discount.utils';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  providers: [TaskService, GameEventHandlerService, TimeService, DiscountUtil],
})
export class TaskModule {}
