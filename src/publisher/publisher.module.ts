import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from 'src/database/entities/publisher.entity';
import { GameModule } from 'src/game/game.module';
import { PublisherService } from './publisher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublisherEntity]),
    forwardRef(() => GameModule),
  ],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
