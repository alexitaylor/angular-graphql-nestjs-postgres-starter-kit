import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';
import {
  CreateUpdateUserDto,
  SignInUserDto,
  SignUpUserDto,
  UserDto,
} from './dto/users.dto';
import { RolesEntity } from '../roles/roles.entity';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async findAll(page: number = 1, limit: number = 20, newest: boolean = true) {
    const users = await this.userRepository.find({
      relations: ['role', 'messages'],
      take: limit,
      skip: limit * (page - 1),
      order: newest && { updatedAt: 'DESC' },
    });
    return users.map(user => user.toResponseObject(false));
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'messages'],
    });
    return user.toResponseObject(false);
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    return this.findOneById(payload.id);
  }

  async read(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role', 'messages'],
    });
    return user.toResponseObject(false);
  }

  async signIn(data: SignInUserDto) {
    const { login, password } = data;
    const user = await this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
      relations: ['role'],
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async signUp(data: SignUpUserDto) {
    const { username, email } = data;
    let user = await this.userRepository.findOne({
      where: [{ username }, { email }],
      relations: ['role'],
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const role = await this.rolesRepository.findOne({
      name: 'USER',
    });

    user = await this.userRepository.create({ ...data, role });
    await this.userRepository.save(user);

    return user.toResponseObject();
  }

  async createUser(data: CreateUpdateUserDto) {
    const { username, email, roleName } = data;

    let user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const role = roleName
      ? await this.rolesRepository.findOne({
          name: roleName,
        })
      : await this.rolesRepository.findOne({
          name: 'USER',
        });

    // TODO generate random password
    const password = '12345678';
    data.password = password;

    delete data.roleName;

    user = await this.userRepository.create({ ...data, role });
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async updateUser(data: CreateUpdateUserDto) {
    const { id, roleName } = data;

    let user = await this.userRepository.findOne({
      where: { id },
    });

    const role = await this.rolesRepository.findOne({
      name: roleName,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    delete data.roleName;
    delete data.id;

    await this.userRepository.update({ id }, { ...data, role });

    user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'messages'],
    });

    return user.toResponseObject();
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await this.userRepository.remove(user);

    return !deletedUser.id;
  }
}
