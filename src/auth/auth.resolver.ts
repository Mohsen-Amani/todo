import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';
// Utilities
import { User } from '../users/user.entity';
// DTOs
import { SignupInput } from './dtos/signup.input';
import { LoginInput } from './dtos/login.input';
import { LoginResponse } from './dtos/login.response';
import { ForgotPasswordInput } from './dtos/forgot-password.input';
import { ResetPasswordInput } from './dtos/reset-password.input';
// Guard
import { GqlAuthGuard } from './guards/GqlAuth.guard';
import { ForgotPasswordResponse } from './dtos/forgot-password.response';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
  ) {}

  @Mutation(() => User)
  async signup(@Args('input') signupInput: SignupInput) {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('input') _: LoginInput, @Context() context: any) {
    return this.authService.login(context.user);
  }

  @Mutation(() => ForgotPasswordResponse)
  forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return this.passwordResetService.sendResetToken(input.email);
  }

  @Mutation(() => String)
  async resetPassword(@Args('input') input: ResetPasswordInput) {
    const { token, password } = input;
    await this.passwordResetService.resetPassword(token, password);
    return 'Password reset was successful';
  }
}
