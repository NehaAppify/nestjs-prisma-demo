import {
  Body,
  Controller,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/types/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /** User register/create */
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Request() req, @Body() createUserDto: CreateUserDto) {
    return {
      data: await this.userService.createUser(createUserDto),
      message: 'User registerd successfully!',
    };
  }
}
