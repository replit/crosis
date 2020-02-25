#### v4.0.1

Increment listener limit for the control channel (channel 0) when requesting a channel open.

#### v4.0.0 [BREAKING-ish]

This is only a breaking change for debugging and stats collection (pings)

See https://github.com/replit/crosis/pull/15

- Debug pings are not started automatically
- You can now call `client.startPing` after you connect to maintain old behavior :)

#### v3.0.2 [BREAKING]

See https://github.com/replit/crosis/pull/12

- Reset the the handshake/connection [`timeout`](https://github.com/replit/crosis/blob/d6dedc5aab6722c557da6df03b71e4e367af305d/src/client.ts#L44) if we get a message on the socket instead of waiting for `{ containerState: READY }`
- [internal] Refactor to simplify code and fit this in easily.
