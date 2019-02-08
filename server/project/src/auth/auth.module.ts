import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// TODO imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//         secretOrPrivateKey: 'secretKey',
//         signOptions: {
//             expiresIn: 3600,
//         },
//     }),
// ],

// TODO controllers: [AuthController],

// tODO providers: [AuthService, JwtStrategy],

@Module({
  imports: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
