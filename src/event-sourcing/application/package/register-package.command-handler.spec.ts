import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPackageCommandHandler } from './register-package.command-handler';
import { RegisterPackageCommand } from './register-package.command';
import { RegisterPackageError } from './register-package.exception';

describe('RegisterPackageCommandHandler', () => {
  let handler: RegisterPackageCommandHandler;
  const membershipMock = {
    subscribePackage: jest.fn(),
    releaseEvents: jest.fn().mockReturnValue([]),
  };

  const membershipReadRepository = {
    findByMembershipId: jest.fn(),
    updateReadModel: jest.fn(),
  };

  const membershipEventStore = {
    save: jest.fn(),
  };

  const eventPublisher = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPackageCommandHandler,
        {
          provide: 'MembershipReadRepository',
          useValue: membershipReadRepository,
        },
        { provide: 'MembershipEventStore', useValue: membershipEventStore },
        { provide: 'EventPublisher', useValue: eventPublisher },
      ],
    }).compile();

    handler = module.get<RegisterPackageCommandHandler>(
      RegisterPackageCommandHandler,
    );
  });

  it('debería lanzar NotFoundException si la membresía no existe', async () => {
    membershipReadRepository.findByMembershipId.mockResolvedValue(null);

    const command = new RegisterPackageCommand('non-existent-id', 10, 2025, 3);
    await expect(handler.handle(command)).rejects.toThrow(RegisterPackageError);
  });

  it('debería ejecutar correctamente la suscripción del package', async () => {
    membershipReadRepository.findByMembershipId.mockResolvedValue(
      membershipMock,
    );

    const command = new RegisterPackageCommand('existing-id', 10, 2025, 3);
    await handler.handle(command);

    expect(membershipMock.subscribePackage).toHaveBeenCalledWith(10, 2025, 3);
    expect(membershipEventStore.save).toHaveBeenCalledWith(membershipMock);
    expect(eventPublisher.publish).toHaveBeenCalled();
    expect(membershipReadRepository.updateReadModel).toHaveBeenCalledWith(
      membershipMock,
    );
  });

  it('debería lanzar error si credits es negativo', async () => {
    const command = new RegisterPackageCommand('valid-id', -5, 2025, 3);
    await expect(handler.handle(command)).rejects.toThrow(RegisterPackageError);
  });
});
