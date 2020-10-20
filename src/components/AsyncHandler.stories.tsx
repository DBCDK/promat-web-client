import { storiesOf } from "@storybook/react";
import React, { useContext } from "react";
import AsyncHandler, { AsyncHandlerContext } from "./AsyncHandler";
import { AsyncRequest } from "../utils/AsyncRequest";

function TextOperations() {
  const context = useContext(AsyncHandlerContext);
  if (context === null) {
    return null;
  }
  const { beginOperation, endOperation, addError, dismissError } = context;
  return (
    <div>
      <button onClick={beginOperation}>BEGIN</button>
      <button onClick={endOperation}>END</button>
      <button
        onClick={() =>
          addError(new Error(`Error at ${new Date().toISOString()}`))
        }
      >
        ADD ERROR
      </button>
      <button onClick={dismissError}>DISMISS ERROR</button>
    </div>
  );
}

function LoadingSpinner() {
  const context = useContext(AsyncHandlerContext);
  if (!context) {
    return null;
  }
  const { isWorking } = context;
  if (!isWorking) {
    return null;
  }
  return <div>INSERT SPINNER COMPONENT HERE</div>;
}

function ErrorDialog() {
  const context = useContext(AsyncHandlerContext);
  if (!context) {
    return null;
  }
  const { errors, dismissError } = context;
  const [error] = errors;
  if (!error) {
    return null;
  }

  return (
    <div>
      <h3>ERROR</h3> {error.message}
      <button onClick={dismissError}>Dismiss</button>
    </div>
  );
}

const sleep = (period: number) =>
  new Promise((resolve) => setTimeout(resolve, period));

const sleepWithError = (period: number) =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("sleepWithError")), period)
  );

class SucceedingOperation extends React.Component<{}, { hasLoaded: boolean }> {
  state = { hasLoaded: false };
  static contextType = AsyncHandlerContext;
  componentDidMount = async () => {
    const promise = sleep(1500);
    await AsyncRequest(promise, this.context);
    this.setState({ hasLoaded: true });
  };

  render = () => {
    const { hasLoaded } = this.state;
    return hasLoaded ? <p>SucceedingOperation has loaded!</p> : null;
  };
}

class FailingOperation extends React.Component<{}, { hasLoaded: boolean }> {
  state = { hasLoaded: false };
  static contextType = AsyncHandlerContext;
  componentDidMount = async () => {
    const promise = sleepWithError(1500);
    await AsyncRequest(promise, this.context);
    this.setState({ hasLoaded: true });
  };
  render = () => {
    const { hasLoaded } = this.state;
    return hasLoaded ? <p>FailingOperation has loaded!</p> : null;
  };
}

storiesOf("AsyncHandler", module)
  .add("test operations", () => (
    <AsyncHandler>
      <TextOperations />
      <LoadingSpinner />
      <ErrorDialog />
    </AsyncHandler>
  ))
  .add("succeeding operation", () => (
    <AsyncHandler>
      <SucceedingOperation />
      <LoadingSpinner />
      <ErrorDialog />
    </AsyncHandler>
  ))
  .add("failing operation", () => (
    <AsyncHandler>
      <FailingOperation />
      <LoadingSpinner />
      <ErrorDialog />
    </AsyncHandler>
  ));
