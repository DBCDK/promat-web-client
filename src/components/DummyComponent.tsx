import React from "react";

interface DummyObject {
  isReady: boolean;
  count: number;
  name: string;
  itemIds: string[];
}

interface Props {
  data: DummyObject;
  isAdmin: boolean;
  onNext: () => void;
  onSelectItem: (id: string) => void;
}

export default class DummyComponent extends React.Component<Props> {
  render = () => {
    const { isAdmin, data, onNext, onSelectItem } = this.props;
    const { isReady, count, name, itemIds } = data;
    return (
      <div>
        {isAdmin && <div style={{ backgroundColor: "red" }}>
          <p>{"you are admin"}</p>
        </div>}
        <div>
          <p>{isReady ? "we are ready" : "we are NOT ready"}</p>
          <h1>Hello {name}</h1>
          Items:
          <ul>
            {itemIds.map((id) => (
              // Don't do this in real life :)
              // https://medium.com/@User3141592/react-gotchas-and-best-practices-2d47fd67dd22
              <li onClick={() => onSelectItem(id)}>{id}</li>
            ))}
          </ul>
          Count: {count}
          <button onClick={onNext}>DummyComponent</button>
        </div>
      </div>
    );
  };
}
