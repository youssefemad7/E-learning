/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    // ✅ 1. check if email exists

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // ✅ 2. hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ 3. create user
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await createdUser.save();

      // ✅ 4. remove password before return To Client
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, refreshToken: __, ...result } = savedUser.toObject();
      return result;
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-password', '-refreshToken']).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  async findById(id: string): Promise<User | null> {
    return this.userModel
      .findOne({ _id: id })
      .select(['-password', '-refreshToken'])
      .exec();
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    return this.userModel.findOne({ _id: id }).select(['-password']).exec();
  }
  async updateRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, {
        refreshToken: hashedRefreshToken,
      })
      .exec();
  }
}
