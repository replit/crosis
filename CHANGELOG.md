#### v7.3.1

Changed the default polling host to gp-v2.replit.com.

#### v7.3.0

Added an optional `pollingHost` field to `ConnectOptions`. This allows callers to override the polling host from gp-v2.herokuapp.com to something else when the polling fallback is used.

#### v7.2.0

Reintroduced the change that allows the client to try to call `fetchTokenMetadata` only once when it tries to connect or during unintentional reconnects. The client will keep the metadata cached until the user calls `client.close` explicitly, if the `reuseTokenMetadata` connection option is passed.

#### v7.1.1

Added Client.addDebugFunc that makes it possible to have more than one debug callback.

#### v7.1.0

Reverted changes from v7.0.0 which caused issues in Replit. The client now always gets a new token when it reconnects and downgrades to polling if it didn't receive a valid api command.

#### v7.0.0 [BREAKING]

The only breaking change is dropping support for `fetchToken` https://github.com/replit/crosis/pull/93/files

Client downgrades to polling less aggressively. Previously it would downgrade after not receiving any valid api command. Now, it relies on the websocket opening as a heuristic for websockets not working.

While the client is trying to connect or during unintentional reconnects, the client will call `fetchTokenMetadata` only once. The client will keep the metadata cached until the user calls `client.close` explicitly.

Fixed a bug with opening channels with the same name.

#### v6.3.0

Allows opening channel with the same name while if others are closing (synchronously).

#### v6.2.0

Added Client.getConnectionMetadata() This change adds a way of obtaining the connection metadata for the WebSocket. This allows obtaining the connection's token, among other things.

Allow passing a thunk (function) to the `service` property of `openChannel` this function expects a string returned for the service name. The function is passed the context.

Default url changed to the global cluster, `eval.repl.it` is no longer supported by the backend.

For tests and debug mode new environment variables are needed. See README

#### v6.1.0

Added long polling support. If the websocket connection fails 3 times in a row we now fallback to using polling using Engine-io and a proxy that talks to the backend.

#### v6.0.0 [BREAKING]

The client has been reworked to handle reconnection internally. The API is drastically different but the general concepts
are the same. Please refer to updated docs for usage information.

#### v5.0.0

Client close event now emits [CloseResult](https://replit-crosis.masfrost.repl.co/modules/_src_client_.html#closeresult)

Channel closing during `channel.request` no longer throws an error. It now returns an extended @replit/protocol::`Command` that includes a [`channelClosed`](https://replit-crosis.masfrost.repl.co/interfaces/_src_channel_.requestresult.html#channelclosed)

#### v4.1.3

Added a specific error (Channel.ChannelCloseError) to assert on when checking channel closing.

#### v4.1.0

Make stack traces for `Channel.request` more usable.

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
