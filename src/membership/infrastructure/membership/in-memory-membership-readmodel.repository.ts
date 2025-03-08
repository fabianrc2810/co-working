/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Membership } from 'src/membership/domain/membership/membership.entity';
import { MembershipReadRepository } from 'src/membership/domain/membership/membership.repository';

export class InMemoryMembershipReadRepository
  implements MembershipReadRepository
{
  private readonly memberships: Map<string, Membership> = new Map();

  async findByUserId(userId: string): Promise<Membership | null> {
    return Promise.resolve(this.memberships.get(userId) || null);
  }

  async updateReadModel(membership: Membership): Promise<void> {
    // Suponiendo que en el read model la llave es el userId
    // Aquí podrías transformar el agregado en un DTO o entidad de consulta
    // Para simplificar, lo almacenamos directamente
    const userId = (membership as any).membershipState.userId.value;
    this.memberships.set(userId, membership);

    return Promise.resolve();
  }
}
