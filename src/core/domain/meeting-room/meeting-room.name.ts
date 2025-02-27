import { BadRequestException } from '@nestjs/common';

export class MeetingRoomName {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string): MeetingRoomName {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    return new MeetingRoomName(name);
  }

  value(): string {
    return this.name;
  }
}
