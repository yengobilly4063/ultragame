import { Module } from '@nestjs/common';
import { PublisherModule } from 'src/publisher/publisher.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [PublisherModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
