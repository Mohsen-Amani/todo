import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entitiy';
import { ListsResolver } from './lists.resolver';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListsService, ListsResolver],
  exports: [ListsService],
})
export class ListsModule {}
