import { v4 as uuidv4 } from 'uuid';

export abstract class Id {
  protected constructor(readonly value: string) {}

  static generate(): string {
    return uuidv4();
  }
}
