import { MembershipUserId } from '../../domain/membership/membership-userid';
import { Membership } from '../../domain/membership/membership.entity';

describe('Membership Aggregate - subscribePackage', () => {
  it('debería registrar el evento PackageSubscribed y actualizar el estado', () => {
    const membership = Membership.createStarted(
      MembershipUserId.create('user-test'),
    );

    membership.subscribePackage(10, 2025, 3);

    const events = membership.releaseEvents();
    expect(events).toHaveLength(2);

    const packageSubscribedEvent = events.find(
      (e) => e.type === 'PackageSubscribed',
    );
    expect(packageSubscribedEvent).toBeDefined();

    expect(packageSubscribedEvent).toBeDefined();
    expect(packageSubscribedEvent!.payload.credits).toBe(10);

    const expectedStartDate = new Date(2025, 2, 1);
    const expectedEndDate = new Date(2025, 3, 0);

    if (packageSubscribedEvent) {
      if (packageSubscribedEvent.payload.startDate) {
        expect(
          new Date(
            packageSubscribedEvent.payload.startDate as string | number | Date,
          ),
        ).toEqual(expectedStartDate);
      }
      expect(
        new Date(
          packageSubscribedEvent.payload.endDate as string | number | Date,
        ),
      ).toEqual(expectedEndDate);
    }
  });
});
