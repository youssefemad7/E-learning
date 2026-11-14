/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/create-user.dto';
import { LoginDto } from './login.dto';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateRefreshToken(user: {
    _id: string;
    email: string;
    role: string;
  }): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user._id,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ) as StringValue,
      },
    );

    return refreshToken;
  }
  async refresh(refreshToken: string): Promise<any> {
    // 1. verify refresh token
    let payload: { sub: string; email: string; role: string };

    try {
      // 2. verify refresh token
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    // 2. Find the user with the stored refresh token hash

    const user = await this.usersService.findByIdWithRefreshToken(payload.sub);
    // 3. Check if the user and stored hash exist
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    // 4. Compare the provided token with the stored hash
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    // 5. Generate a new access token
    const accessToken = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
    // 6. Generate a new refresh token
    const newRefreshToken = await this.generateRefreshToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    // 7. Hash the new refresh token
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 12);
    // 8. Update the stored refresh token hash
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.usersService.updateRefreshToken(user._id, hashedRefreshToken);
    // 9. Remove sensitive fields from the returned user
    const {
      password: _password,
      refreshToken: _storedRefreshToken,
      ...safeUser
    } = user.toObject();
    // 10. Return the new tokens and safe user data
    return {
      user: safeUser,
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    // 1. create user
    const user = await this.usersService.create(createUserDto);
    // 2. generate token
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
    // 3. generate refresh token
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const refreshToken = await this.generateRefreshToken(user);
    //4. hash refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    // 5. call updateRefreshToken method
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.usersService.updateRefreshToken(user._id, hashedRefreshToken);
    return {
      user,
      access_token: token,
      refresh_token: refreshToken,
    };
  }
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    // 1. get user
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // 2. compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // 3. generate token
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
    // 4. generate refresh token
    const refreshToken = await this.generateRefreshToken(user);
    //5. hash refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    // 6. call updateRefreshToken method
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.usersService.updateRefreshToken(user._id, hashedRefreshToken);
    // 7. remove password
    const { password: _, refreshToken: __, ...result } = user.toObject();
    return {
      user: result,
      access_token: token,
      refresh_token: refreshToken,
    };
  }
  async logout(user: { userId: string }) {
    await this.usersService.updateRefreshToken(user.userId, null);
    return { message: 'Logged out successfully' };
  }
}
