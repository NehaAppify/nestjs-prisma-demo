import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/types/dto/user.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /** Create user */
  async createUser(createUserDto: CreateUserDto) {
    const { role, firstName, lastName, password } = createUserDto;
    const email = createUserDto.email.toLowerCase();
    const found = await this.prisma.user.findUnique({ where: { email } });
    if (found) {
      throw new BadRequestException(`This email already exists.`);
    }

    const hash = await bcrypt.hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: hash,
        isActive: true,
        profileImage: '',
      },
    });
    const { password: _, ...result } = user;
    return { token: this.jwtService.sign(result), userDetails: user };
  }
}
