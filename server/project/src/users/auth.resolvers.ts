import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { SignUpUserDto, SignInUserDto, UserDto } from './dto/users.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver('User')
export class AuthResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query('me')
  @UseGuards(new AuthGuard())
  async me(@Context('me') me): Promise<UserDto> {
    const { username } = me;
    return await this.usersService.read(username);
  }

  @Mutation('signIn')
  async signIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<UserDto> {
    const user: SignInUserDto = { login, password };
    return await this.usersService.signIn(user);
  }

  @Mutation('signUp')
  async signUp(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<UserDto> {
    const user: SignUpUserDto = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    return await this.usersService.signUp(user);
  }
}
