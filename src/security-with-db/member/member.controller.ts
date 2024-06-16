import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './dto/member.dto';
import { Member } from '../common/schema/member.entity';
import { AuthDbGuard } from '../auth-db/auth-db-guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('create')
  create(@Body() memberDto: MemberDto): Promise<Member> {
    return this.memberService.create(memberDto);
  }

  @Post('getAll')
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @UseGuards(AuthDbGuard)
  @Post('get')
  findOne(@Body('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Post('getByUsername')
  findOneByUsername(@Body('username') username: string): Promise<Member> {
    return this.memberService.findOneByUsername(username);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() memberDto: MemberDto): Promise<Member> {
    return this.memberService.update(id, memberDto);
  }

  @Post('delete')
  remove(@Body('id') id: string): Promise<string> {
    return this.memberService.remove(id);
  }
}