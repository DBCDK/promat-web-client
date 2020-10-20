import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  numberOfOperations: number;
  errors: Error[];
}

interface AsyncHandlerContext {
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
