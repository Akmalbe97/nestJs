import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get("getItem")
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @Roles('admin') 
  @UseGuards(RoleGuard)
  create(@Body() data: Partial<Item>): Promise<Item> {
    return this.itemsService.create(data);
  }

  @Put(':id')
  @Roles('admin') 
  @UseGuards(RoleGuard)
  update(
    @Param('id') id: number,
    @Body() data: Partial<Item>,
  ): Promise<[number, Item[]]> {
    return this.itemsService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin') 
  @UseGuards(RoleGuard)
  delete(@Param('id') id: number): Promise<void> {
    return this.itemsService.delete(id);
  }
}
