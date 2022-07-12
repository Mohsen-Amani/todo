import { Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class UsersResolver {}
