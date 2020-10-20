import { AsyncHandlerContext } from "../components/AsyncHandler";

export async function AsyncRequest<T>(
  promise: Promise<T>,
  context: AsyncHandlerContext
): Promise<T | null> {
  const { beginOperation, endOperation, addError } = context;
  try {
    beginOperation();
    const result = await promise;
    endOperation();
    return result;
  } catch (error) {
    addError(error);
    endOperation();
    return null;
  }
}
