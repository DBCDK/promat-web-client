import { storiesOf } from "@storybook/react";
import React, { useContext } from "react";
import AsyncHandler, { AsyncHandlerContext } from "./AsyncHandler";

function OperationComponent() {
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

storiesOf("AsyncHandler", module).add("default", () => (
  <AsyncHandler>
    <OperationComponent />
    <LoadingSpinner />
    <ErrorDialog />
  </AsyncHandler>
));
