import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublisherEntity } from './publisher.entity';

@Entity({ name: 'games', orderBy: { releaseDate: 'DESC' } })
@Index('idx_game_realease_date', ['releaseDate'])
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  title: string;

  @Column('int')
  price: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => PublisherEntity)
  @JoinColumn({ name: 'publisherId', referencedColumnName: 'id' })
  publisher?: PublisherEntity;

  @Column({ nullable: true })
  publisherId?: string;

  @Column('timestamp', { nullable: true })
  releaseDate: Date;
}
