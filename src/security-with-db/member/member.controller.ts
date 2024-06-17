import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './dto/member.dto';
import { Member } from '../common/schema/member.entity';
import { AuthDbGuard } from '../auth-db/auth-db-guard';
import { Roles } from '../common/decorator/roles.decorator';
import Role from '../common/constant/role.enum';
import { RolesGuard } from '../common/role-base/roles.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('create')
  create(@Body() memberDto: MemberDto): Promise<Member> {
    return this.memberService.create(memberDto);
  }

  @UseGuards(AuthDbGuard)
  @Post('getAll')
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('get')
  findOne(@Body('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @UseGuards(AuthDbGuard)
  @Post('getByUsername')
  findOneByUsername(@Body('username') username: string): Promise<Member> {
    return this.memberService.findOneByUsername(username);
  }

  @UseGuards(AuthDbGuard)
  @Post('update')
  update(@Body('id') id: string, @Body() memberDto: MemberDto): Promise<Member> {
    return this.memberService.update(id, memberDto);
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('delete')
  remove(@Body('id') id: string): Promise<string> {
    return this.memberService.remove(id);
  }
}
