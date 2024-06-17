import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';

@Injectable()
export class AuthDbService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const member = await this.memberService.findOneByUsername(username);
    if (!member) {
      console.log('Member not found');
      throw new UnauthorizedException('Member not found');
    }
    if (member?.password !== pass) {
      console.log('Password does not match');
      throw new UnauthorizedException();
    }
    const payload = { id: member.id, username: member.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}