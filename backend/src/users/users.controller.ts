import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.schema';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //TESTING
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.INSTRUCTOR)
  // @Get('instructor-test')
  // instructorTest(@Request() req) {
  //   return {
  //     message: 'Instructor access granted',
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     user: req.user,
  //   };
  // }
}
