# Wednesday Flow — Requester browses neighbors and opens a profile

## Flow diagram

```
[Home]
  |
  v
Browse neighbors in "Trusted on your block"
  |
  v
Scan NeighborCard (photo, name, available, bio, price, distance, rating)
  |
  +---> Neighbor unavailable?
  |       |
  |       v
  |     No "Available" badge shown
  |     User decides: tap anyway or skip
  |
  +---> Neighbor not verified?
  |       |
  |       v
  |     No shield mark on avatar
  |     User decides: tap anyway or skip
  |
  v
Tap NeighborCard
  |
  +---> [Neighbor not found / removed]
  |       |
  |       v
  |     Error screen: "This neighbor is no longer available"
  |     Action: return to Home
  |
  v
[Neighbor Profile]
  |
  +---> View full bio, reviews, services offered
  |
  +---> No availability?
  |       |
  |       v
  |     Empty state: "No open slots this week"
  |     Action: notify me / go back
  |
  +---> Pricing varies by service?
  |       |
  |       v
  |     Show service list with individual pricing
  |     "from $24 / walk" for dog walking
  |     "from $90 / visit" for deep clean
  |
  v
Tap "Request [service]"
  |
  v
[Booking Form]
  |  Fields: date/time, address, notes (optional)
  |
  +---> Form empty / incomplete?
  |       |
  |       v
  |     Validation errors inline; submit disabled
  |
  +---> Address not verified?
  |       |
  |       v
  |     Block: "Verify your address to continue"
  |     Action: verify address flow
  |
  v
Submit booking request
  |
  +---> [LOADING] Sending request...
  |
  +---> Network error?
  |       |
  |       v
  |     Error toast: "Could not send. Check connection and retry."
  |     Action: retry button
  |
  +---> Neighbor already fully booked?
  |       |
  |       v
  |     Error: "This neighbor is no longer accepting requests for this date"
  |     Action: return to neighbor list
  |
  v
[SUCCESS] Confirmation screen
  |  "Request sent to [Neighbor]. You'll be notified when they respond."
  |  role="status" aria-live="polite"
  |
  v
[Waiting for neighbor response]
  |
  +---> Neighbor accepts
  |       |
  |       v
  |     Notification + booking confirmed screen
  |     Booking status: confirmed
  |
  +---> Neighbor declines
  |       |
  |       v
  |     Notification: "[Neighbor] is unavailable for this date"
  |     Action: find another neighbor / change date
  |
  +---> Neighbor never responds (timeout: 24h)
  |       |
  |       v
  |     System notification: "No response yet. Try another neighbor?"
  |     Booking status: expired
  |
  +---> Requester cancels before response
          |
          v
        Confirmation: "Request cancelled"
        Booking status: cancelled
```

## Assumptions

- **[ASSUMPTION]** Address verification is required before booking, based on the
  brief's real-name and location requirements. The prototype does not show this
  gate explicitly.
- **[ASSUMPTION]** Neighbor response timeout is 24 hours. The brief does not
  specify a duration; this is a product decision that needs confirmation.
- **[ASSUMPTION]** A neighbor can only accept one booking per time slot.
  Conflict resolution (double-booking) is not shown in the prototype.
- **[ASSUMPTION]** The "Available" badge on the NeighborCard reflects a
  general state, not per-service availability. Per-service availability would
  require a richer data model.

## State and API contract table

| State | Trigger | API response | UI |
| --- | --- | --- | --- |
| **Neighbor list loaded** | Home mounts | `GET /neighbors?neighborhood={id}` -> `200 [Neighbor[]]` | Render neighbor cards in "Trusted on your block" |
| **Neighbor list empty** | No neighbors in neighborhood | `200 []` | Empty state: "No neighbors nearby yet" |
| **Neighbor list error** | Network failure | `5xx` or timeout | Error state: "Could not load neighbors. Retry." |
| **Neighbor available** | `available: true` | Part of neighbor payload | Coral "Available" badge via `nb__avail` |
| **Neighbor unavailable** | `available: false` | Part of neighbor payload | No badge; card still tappable |
| **Neighbor featured** | `featured: true` | Part of neighbor payload | `nb--featured` class adds emphasis |
| **Neighbor profile loaded** | Tap NeighborCard | `GET /neighbors/{id}` -> `200 Neighbor` | Full neighbor profile with services and availability |
| **Neighbor not found** | Neighbor removed/deactivated | `404` | Error: "This neighbor is no longer available" |
| **Neighbor unverified** | `verified: false` | Part of neighbor payload | No shield mark on avatar |
| **No availability** | Neighbor has no open slots | `availability: []` in payload | Empty state: "No open slots this week" |
| **Booking form empty** | User has not filled required fields | N/A (client) | Submit disabled; no inline errors yet |
| **Booking form invalid** | User submits with missing/bad data | N/A (client validation) | Inline validation errors per field |
| **Address not verified** | User's address verification incomplete | `GET /users/{id}` -> `addressVerified: false` | Blocking gate: "Verify your address" |
| **Booking submitting** | User taps confirm | `POST /bookings` -> pending | Loading spinner; form disabled |
| **Booking network error** | Request fails | `5xx` or timeout | Error toast + retry button |
| **Booking conflict** | Neighbor no longer available for slot | `409 Conflict` | Error: "Neighbor no longer accepting requests" |
| **Booking sent** | Request accepted by server | `201 { bookingId, status: "pending" }` | Success screen with confirmation copy |
| **Neighbor accepts** | Neighbor confirms booking | `PATCH /bookings/{id}` -> `status: "confirmed"` | Push notification + confirmed screen |
| **Neighbor declines** | Neighbor rejects booking | `PATCH /bookings/{id}` -> `status: "declined"` | Notification + "find another neighbor" |
| **Neighbor timeout** | No response within 24h | System job -> `status: "expired"` | Notification + suggestion to try another |
| **Requester cancels** | User cancels before response | `DELETE /bookings/{id}` -> `200` | Confirmation: "Request cancelled" |

## Endpoints summary

| Method | Endpoint | Purpose | Key states |
| --- | --- | --- | --- |
| `GET` | `/neighbors?neighborhood={id}` | List neighbors for a neighborhood | `200` list, `200 []` empty, `5xx` error |
| `GET` | `/neighbors/{id}` | Neighbor profile + availability | `200` found, `404` not found |
| `GET` | `/users/{id}` | Check requester profile + address verification | `200` with `addressVerified` flag |
| `POST` | `/bookings` | Create a booking request | `201` created, `409` conflict, `422` validation, `5xx` error |
| `PATCH` | `/bookings/{id}` | Neighbor accepts/declines | `200` with new status |
| `DELETE` | `/bookings/{id}` | Requester cancels pending booking | `200` cancelled, `404` not found, `409` already confirmed |

## Gaps found during stress testing

1. **What happens if the neighbor's pricing changes between card view and
   profile?** The card shows "from $24 / walk" but by the time the user taps
   through to booking, the neighbor may have updated their rate. The API should
   return the current price at booking time, and the UI should show a
   confirmation if it differs from what the user saw.

2. **The prototype does not show a decline/timeout path.** The booking flow ends
   at "request sent." What the requester sees when a neighbor says no — or says
   nothing — is undefined in the current screens. This needs a designed state.

3. **Double-booking prevention is not addressed.** If two requesters book the
   same neighbor for the same slot simultaneously, one will get a `409`. The
   losing requester needs a graceful fallback, not just an error.

4. **Availability granularity is unclear.** The NeighborCard shows "Available"
   as a general state, but is that per-day, per-service, or always-on? If a
   neighbor is available for dog walking but not for pet sitting, the card-level
   badge is misleading.

5. **Distance format switching.** The card supports three formats (`walk`,
   `blocks`, `mi`) but the trigger for switching is undefined. Is it user
   preference? Proximity threshold? Device setting? This is a product decision.
