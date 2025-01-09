import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private readonly itemModel: typeof Item) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.findAll();
  }

  async findOne(id: number): Promise<Item> {
    return this.itemModel.findByPk(id);
  }

  async create(data: Partial<Item>): Promise<Item> {
    return this.itemModel.create(data);
  }

  async update(id: number, data: Partial<Item>): Promise<[number, Item[]]> {
    return this.itemModel.update(data, { where: { id }, returning: true });
  }

  async delete(id: number): Promise<void> {
    const item = await this.findOne(id);
    if (item) {
      await item.destroy();
    }
  }
}
