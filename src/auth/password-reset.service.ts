// Services
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EncryptService } from './encrypt.service';
// Entities
import { User } from '../users/user.entity';
import { PasswordReset } from './password-reset.entity';
// **
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { ForgotPasswordResponse } from './dtos/forgot-password.response';
import { ResetPasswordResponse } from './dtos/reset-password.response';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset) private repo: Repository<PasswordReset>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private encryptService: EncryptService,
  ) {}

  async sendResetToken(email: string): Promise<ForgotPasswordResponse | Error> {
    // Find User
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User account does not exists!');
    }
    // Generate Token
    const token = this.generateToken();
    // Send Reset Password Link
    const sendMail = await this.mailerService.sendMail({
      to: email,
      from: 'mohsenamani001@outlook.com',
      subject: 'Forgot Password',
      template: './forgot-password',
      context: {
        full_name: user.full_name,
        token,
      },
    });
    if (!sendMail) {
      throw new HttpException(
        {
          message: 'Something went wrong',
          description: 'Failed to send link.',
        },
        500,
      );
    }
    const storePasswordReset = await this.repo.save({
      token,
      user,
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
    });
    if (!storePasswordReset) {
      throw new HttpException({ message: 'Something went wrong' }, 500);
    }

    return new ForgotPasswordResponse(
      'Please check you email from reset password link',
    );
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<ResetPasswordResponse | Error> {
    // Verify token
    const validToken = await this.repo
      .createQueryBuilder('password_resets')
      .innerJoinAndSelect('password_resets.user', 'users')
      .where('token = :token AND expires_at > :expires_at', {
        token,
        expires_at: new Date(),
      })
      .getOne();

    if (!validToken) {
      throw new UnauthorizedException('Invalid token');
    }
    // Hash password
    const encPassword = await this.encryptService.encrypt(password);
    // Update user password
    const updateUser = await this.usersService.update(validToken.user, {
      password: encPassword,
    });
    console.log(updateUser);
    // Delete user reset password tokens
    await this.removeUserTokens(validToken.user.id);

    return new ResetPasswordResponse(
      'Password has changed successfully.',
      updateUser,
    );
  }

  generateToken(): string {
    return randomBytes(8).toString('hex');
  }

  removeUserTokens(userId: number): Promise<DeleteResult> {
    return this.repo.delete({ user: userId } as FindOptionsWhere<User>);
  }
}
