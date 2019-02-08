import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async findAll(page: number = 1) {
    const roles = await this.rolesRepository.find();
    return roles.map(role => role.toResponseObject());
  }

  async findOneById(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
    });

    return role.toResponseObject();
  }

  async createRole(name: string) {
    let role = await this.rolesRepository.findOne({
      where: [{ name }],
    });

    if (role) {
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
    }

    role = await this.rolesRepository.create({ name });

    await this.rolesRepository.save(role);

    return role.toResponseObject();
  }

  async updateRole(id: string, name: string) {
    let role = await this.rolesRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await this.rolesRepository.update({ id }, { name });

    role = await this.rolesRepository.findOne({
      where: { id },
    });

    return role.toResponseObject();
  }

  async deleteRole(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await this.rolesRepository.remove(role);

    return !role.id;
  }
}
