import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32 })
  firstName: string;

  @Column({ type: 'varchar', length: 32 })
  lastName: string;

  @Column({ type: 'varchar', length: 32 })
  email: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
