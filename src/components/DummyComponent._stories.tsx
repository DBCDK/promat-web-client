import React from "react";
import { storiesOf } from "@storybook/react";
import DummyComponent from "./DummyComponent";
import { action } from "@storybook/addon-actions";

storiesOf("DummyComponent", module).add("default", () => (
  <DummyComponent
    isAdmin={false}
    data={{
      count: 12,
      itemIds: ["w3e4r5t6y7u8", "drftgyhbnu", "e45f6gyhuij"],
      isReady: true,
      name: "John Doe",
    }}
    onNext={action("onNext")}
    onSelectItem={action("onSelectItem")}
  />
)).add("admin", () => (
    <DummyComponent
      isAdmin={true}
      data={{
        count: 12,
        itemIds: ["w3e4r5t6y7u8", "drftgyhbnu", "e45f6gyhuij"],
        isReady: true,
        name: "John Doe",
      }}
      onNext={action("onNext")}
      onSelectItem={action("onSelectItem")}
    />
  )).add("no items", () => (
    <DummyComponent
      isAdmin={false}
      data={{
        count: 12,
        itemIds: [],
        isReady: true,
        name: "John Doe",
      }}
      onNext={action("onNext")}
      onSelectItem={action("onSelectItem")}
    />
  ));
  
