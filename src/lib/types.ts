/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;

/**
 * @isInt
 */
export type Int = number;

/**
 * The `Expand` type is a utility type that takes an object type `T` and creates a new type with the same properties as `T`.
 * It is used as a work around for an issue with Tsoa and generic utility types in the models.
 * See: https://github.com/lukeautry/tsoa/issues/911
 */
export type Expand<T> = { [K in keyof T]: T[K] };
