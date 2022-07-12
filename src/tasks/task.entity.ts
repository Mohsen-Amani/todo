import { ObjectType, Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { List } from '../lists/list.entitiy';

@Entity('tasks')
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  description: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @Column({
    nullable: true,
    default: null,
  })
  @Field({
    nullable: true,
  })
  completed_at: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => List)
  @ManyToOne(() => List, (list) => list.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  list: List;

  @UpdateDateColumn({
    nullable: true,
    default: null,
  })
  @Field({
    nullable: true,
  })
  updated_at: Date;
}
