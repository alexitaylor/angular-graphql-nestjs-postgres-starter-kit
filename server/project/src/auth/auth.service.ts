import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './jwt-payload.interface';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  constructor() {}

  createToken(jwtPayload: JwtPayload) {
    return jwt.sign(
      {
        ...jwtPayload,
      },
      environment.secret,
      { expiresIn: environment.expiresIn },
    );
  }
}
