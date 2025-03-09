/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateMembershipCommandHandler } from '../application/membership/create-membership.command-handler';
import { CreateMembershipCommand } from '../application/membership/create-membership.command';
import { ErrorResponseFactory } from './error-response-factory';

export class CreateMembershipDto {
  userId: string;
}

@Controller('membership')
export class MembershipController {
  constructor(
    private readonly createMembershipCommandHandler: CreateMembershipCommandHandler,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<{ message: string }> {
    try {
      const command = new CreateMembershipCommand(createMembershipDto.userId);
      await this.createMembershipCommandHandler.handle(command);
      return { message: 'Membresía creada exitosamente' };
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
