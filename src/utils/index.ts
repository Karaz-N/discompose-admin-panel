

/**
 * Placeholder for a function that returns a value of type T.
 *
 * Use for prototyping interfaces and functions.
 *
 * @returns {T} The value of type T (In reality, it will throw an exception).
 *
 * @async
 * @example
 * const toImplementLater = (): Response => {
 *     return todo(); // Notice the type inference
 * }
 */
export const todo = <T>(): T => {
	throw "PLEASE IMPLEMENT ME";
};

/**
 * Placeholder for an async function that returns a value of type T.
 *
 * Use for prototyping interfaces and functions.
 *
 * @returns {Promise<T>} A Promise of a T (In reality, it will throw an exception).
 *
 * @async
 * @example
 * const toImplementLater = async (): Promise<Response> => {
 *    return atodo(); // Notice the type inference
 * }
 */
export const atodo = async <T>(): Promise<T> => {
	throw "PLEASE IMPLEMENT ME";
};

/** No reason why this type would be lower-case! */
export type Never = never;


export const panic = (message: string): never => {
	throw new Error(message);
}
