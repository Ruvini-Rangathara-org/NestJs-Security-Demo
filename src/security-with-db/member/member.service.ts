import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../common/schema/member.entity';
import { MemberDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(memberDto: MemberDto): Promise<Member> {
    const member = this.memberRepository.create(memberDto);
    return this.memberRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async findOne(id: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { username } });
  }

  async update(id: string, memberDto: MemberDto): Promise<Member> {
    await this.memberRepository.update(id, memberDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<string> {
    await this.memberRepository.delete(id);
    return "Successfully deleted member"
  }
}
