import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('groups')
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    length: 45,
  })
  @Field()
  name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  description: string;

  @ManyToMany(() => User, (user) => user.groups)
  @Field(() => [User])
  users: User[];

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null,
  })
  @Field()
  updated_at: Date;
}
