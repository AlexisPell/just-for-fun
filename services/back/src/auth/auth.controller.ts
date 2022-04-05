import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/user.document';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { UserResDTO } from 'src/users/dto/responses/user-res.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { ConfigService } from 'src/config/config.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Get me, if logged in' })
  @ApiOkResponse({ type: User, description: 'User' })
  @Get('me')
  status(@Req() req: Request) {
    console.log(`\nREQUEST USER: ${JSON.stringify(req.user, null, 2)}`);
    console.log('\nREQUEST SESSION:', (req as any).session);
    console.log('\nREQUEST COOKIE:', (req as any).cookies);
    if (!req.user) throw new UnauthorizedException('Unauthorized to get me');
    return new UserResDTO(req.user as CreateUserDto);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.authService.registration(body);
    res.redirect(307, 'login');
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    res.redirect(`me`);
  }

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Res() res: any) {
    // res.redirect(`${process.env.WEB_URL}`);
    res.redirect(`${this.configService.serverApiEndpoint}/auth/me`);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.send({
      msg: 'Logged out',
    });
  }
}
