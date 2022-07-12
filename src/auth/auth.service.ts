import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
// Services
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EncryptService } from './encrypt.service';
// Entities
import { User } from '../users/user.entity';
// DTOs
import { SignupInput } from './dtos/signup.input';
import { LoginResponse } from './dtos/login.response';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async signup(signupInput: SignupInput) {
    const user = await this.usersService.exists({ email: signupInput.email });
    if (user) {
      throw new ConflictException('User already exists!');
    }
    const { password, ...data } = signupInput;

    const encPassword = await this.encryptService.encrypt(password);

    return this.usersService.create({ ...data, password: encPassword });
  }

  async login(user: User) {
    const accessToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
    return new LoginResponse('Login was successful.', { accessToken, user });
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ email });

    const isValidPass = await this.encryptService.verifyHash(
      password,
      user?.password || '',
    );

    if (!user || !isValidPass) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }
}
