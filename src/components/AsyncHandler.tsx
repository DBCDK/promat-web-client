import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  numberOfOperations: number;
  errors: Error[];
}

export interface AsyncHandlerContext {
  addError(error: Error): void;
  dismissError(): void;
  beginOperation(): void;
  endOperation(): void;
  errors: Error[];
  isWorking: boolean;
}

export const AsyncHandlerContext = React.createContext<AsyncHandlerContext | null>(
  null
);

export default class AsyncHandler extends React.Component<Props, State> {
  state = { numberOfOperations: 0, errors: [] };

  addError = (error: Error) =>
    this.setState((prevState) => ({ errors: [...prevState.errors, error] }));

  dismissError = () =>
    this.setState((prevState) => {
      const [, ...errors] = prevState.errors;
      return { errors };
    });

  beginOperation = () =>
    this.setState((prevState) => ({
      numberOfOperations: prevState.numberOfOperations + 1,
    }));

  endOperation = () =>
    this.setState((prevState) => ({
      numberOfOperations: Math.max(0, prevState.numberOfOperations - 1),
    }));

  render = () => {
    const { numberOfOperations, errors } = this.state;
    const { children } = this.props;
    const contextValue: AsyncHandlerContext = {
      endOperation: this.endOperation,
      beginOperation: this.beginOperation,
      addError: this.addError,
      dismissError: this.dismissError,
      isWorking: numberOfOperations > 0,
      errors: errors,
    };
    return (
      <AsyncHandlerContext.Provider value={contextValue}>
        {children}
      </AsyncHandlerContext.Provider>
    );
  };
}

export async function asyncRequest<T>(
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

export interface AsyncHandlerProps {
  asyncHandler: <T>(promise: Promise<T>) => Promise<T | null>;
}

type PropsWithoutInjectedHandler<P> = Omit<P, keyof AsyncHandlerProps>;

export function withAsyncHandler<P>(Component: React.ComponentType<P>) {
  return class ComponentWithAsyncHandler extends React.Component<
    PropsWithoutInjectedHandler<P>
  > {
    static contextType = AsyncHandlerContext;
    context!: AsyncHandlerContext | null;
    render = () => {
      const asyncHandler: <T>(promise: Promise<T>) => Promise<T | null> = (
        promise
      ) => {
        if (this.context === null) {
          throw new Error(
            "withAsyncHandler should only wrap components that are mounted inside <AsyncHandler />."
          );
        }
        return asyncRequest(promise, this.context);
      };
      const { ...props } = this.props;
      return (
        <Component {...props as P} asyncHandler={asyncHandler}></Component>
      );
    };
  };
}
