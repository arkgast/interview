import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
