import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@Entity('password_resets')
@ObjectType()
export class PasswordReset {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    length: 100,
  })
  @Field()
  token: string;

  @ManyToOne(() => User, (user) => user.password_resets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  expires_at: Date;

  @CreateDateColumn()
  @Field()
  created_at: Date;
}
