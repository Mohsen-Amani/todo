import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PasswordReset } from '../auth/password-reset.entity';
import { Group } from '../groups/group.entity';
import { List } from '../lists/list.entitiy';
import { Task } from '../tasks/task.entity';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    length: 45,
  })
  @Field()
  full_name: string;

  @Column({
    length: 45,
    unique: true,
  })
  @Field()
  email: string;

  @Column({
    length: 100,
  })
  password: string;

  @Field(() => [PasswordReset], { nullable: true })
  @OneToMany(() => PasswordReset, (reset) => reset.user)
  password_resets: PasswordReset[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({
    name: 'users_groups',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'group_id' },
  })
  groups: Group[];

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => List, (list) => list.user)
  @Field(() => [List])
  lists: List[];

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
