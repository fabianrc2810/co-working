/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { CreateMembershipCommandHandler } from '../application/membership/create-membership.command-handler';
import { CreateMembershipCommand } from '../application/membership/create-membership.command';
import { ErrorResponseFactory } from './error-response-factory';
import {
  GetFullMembershipSummaryQuery,
  GetFullMembershipSummaryQueryHandler,
} from '../application/membership/get-membership.command-handler';
import { MembershipSummaryReadModel } from '../application/membership/dto/membership-summary';
import { CreateMembershipDto } from '../application/membership/dto/create-membership';

@Controller('memberships')
export class MembershipController {
  constructor(
    private readonly createMembershipCommandHandler: CreateMembershipCommandHandler,
    private readonly queryHandler: GetFullMembershipSummaryQueryHandler,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<{ message: string }> {
    try {
      const command = new CreateMembershipCommand(createMembershipDto.userId);
      await this.createMembershipCommandHandler.handle(command);
      return { message: 'Membership created successfully' };
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }

  @Get('summary')
  async getSummary(userId: string): Promise<MembershipSummaryReadModel> {
    try {
      const query = new GetFullMembershipSummaryQuery(userId);
      const readModel = await this.queryHandler.handle(query);
      return readModel;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
