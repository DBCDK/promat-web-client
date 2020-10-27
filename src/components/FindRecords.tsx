import { useCallback } from "react";
import React from "react";
import { RecordListItem } from "../../promat-web-shared/types/record";
import { FindRecordsUIProps } from "../containers/FindRecordsContainer";

interface State {
  id: string;
}

export default class FindRecords extends React.Component<
  FindRecordsUIProps,
  State
> {
  state = { id: "" };

  handleSearch = () => {
    const { id } = this.state;
    const { onSearch } = this.props;
    onSearch({ id });
  };

  handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.currentTarget.value;
    this.setState({ id });
  };

  render = () => {
    const { id } = this.state;
    const { results, onCreateCase } = this.props;
    return (
      <div>
        <h1>Find records</h1>
        ID: <input type="text" value={id} onChange={this.handleChangeId} />
        <button onClick={this.handleSearch}>Search</button>
        {results ? (
          <ul>
            {results.map((item) => (
              <RecordItem record={item} onSelect={onCreateCase} />
            ))}
          </ul>
        ) : (
          "No results"
        )}
      </div>
    );
  };
}

interface RecordProps {
  record: RecordListItem;
  onSelect: (record: RecordListItem) => void;
}
function RecordItem({ record, onSelect }: RecordProps) {
  const handleSelect = useCallback(() => onSelect(record), [onSelect, record]);
  return (
    <li>
      <button onClick={handleSelect}>{record.title}</button>
    </li>
  );
}
