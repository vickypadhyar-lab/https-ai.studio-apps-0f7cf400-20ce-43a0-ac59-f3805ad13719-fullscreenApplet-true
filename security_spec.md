# VibeLive Security Specification

## Data Invariants
1. **Immutable Identity**: A user cannot modify their `id` or another user's profile.
2. **Atomic Gifting**: Gifting must increment both the sender's `giftsSent` and the host's `starPoints` atomically (simulated via rules validation of score increments).
3. **PK Integrity**: Battle scores can only be incremented by active viewers of the respective rooms.
4. **Verified Participation**: Only users with verified emails can host or send high-value gifts.

## The Dirty Dozen Payloads (Target: Mission Critical Logic)
1. **Self-Promotion**: User attempts to set their own `starPoints` to 1,000,000.
2. **Gift Spoofing**: User sends a message claiming to have sent a 'Crown' without a corresponding transaction.
3. **PK Hijack**: User attempts to update the score of Room B while being in Room A's chat.
4. **Identity Theft**: User A attempts to update User B's avatar.
5. **Score Reset**: Host attempts to reset their battle score to zero when losing.
6. **Time Warp**: Client sends an `expiresAt` for a battle that is 10 years in the future.
7. **Chat Spam**: Bombarding the room with 1MB text strings in the `text` field.
8. **Shadow Room**: Creating a room with `hostId` pointing to another user.
9. **Role Escalation**: Setting `isAdmin: true` on a profile.
10. **Ghost Viewers**: Artificially inflating `viewerCount` by thousands in one batch.
11. **Negative Gifting**: Sending a gift with value -100 to steal points.
12. **Zombie Battle**: Updating a battle that has already expired.

## Validation Strategy
- `isValidUser()`: Enforces strict schema and ownership.
- `isValidMessage()`: Limits text size and ensures timestamps match `request.time`.
- `isValidBattle()`: Prevents modification of participant IDs and ensures `expiresAt` is logical.
