import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publishers' })
@Index('idx_publisher_siret', ['siret'], { unique: true })
export class PublisherEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar')
  siret: number;

  @Column('varchar', { nullable: true })
  phone: string;
}
