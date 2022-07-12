import { ObjectType, Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

@Entity('lists')
@ObjectType()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    length: 45,
  })
  @Field()
  name: string;

  @Column({
    nullable: true,
    length: 100,
  })
  @Field({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User, (user) => user.lists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @OneToMany(() => Task, (task) => task.list)
  @Field(() => [Task], {
    nullable: true,
    defaultValue: [],
  })
  tasks: Task[];

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null,
  })
  @Field({
    nullable: true,
  })
  updated_at: Date;
}
