export default class CrosisError extends Error {
  /** extras - a map of event data in a format appropriate to send to an error logging service */
  public readonly extras: Record<string, unknown> | null;
  /** tags - a map of tags to their values in a format appropriate to send to an error logging service */
  public readonly tags: Record<string, string> | null;

  constructor(
    message: string,

    extras: Record<string, unknown> | null = null,
    tags: Record<string, string> | null = null,
  ) {
    super(message);

    this.extras = extras;
    this.tags = tags;
  }
}
