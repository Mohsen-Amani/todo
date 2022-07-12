import { Module } from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordResetService } from './password-reset.service';
import { EncryptService } from './encrypt.service';
// Resolvers
import { AuthResolver } from './auth.resolver';
// Modules
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { GroupsModule } from '../groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// **
import { JwtStrategy } from './guards/jwt.strategy';
import { PasswordReset } from './password-reset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordReset]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRE'),
        },
      }),
    }),
  ],
  providers: [
    EncryptService,
    PasswordResetService,
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
