import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import { RecordListItem } from "../../promat-web-shared/types/record";
import fetchOperations from "../utils/fetchOperations";
import FindRecords from "../components/FindRecords";

interface FindRecordHistoryLocationState {
  record: RecordListItem;
}

interface Props extends RouteChildrenProps {} //<any, FindRecordHistoryLocationState>

export interface SearchParams {
  id: string;
}

interface State {
  results?: RecordListItem[];
}

class FindRecordsContainer extends React.Component<Props, State> {
  state = { results: undefined };

  handleCreateCase = (record: RecordListItem) => {
    const { history } = this.props;
    history.push("/cases/new", { record });
  };

  handleSearch = async ({ id }: SearchParams) => {
    const results = await fetchOperations.searchRecords(id);
    this.setState({ results });
  };
  
  render = () => {
    const { results } = this.state;
    return (
      <div>
        <FindRecords
          onCreateCase={this.handleCreateCase}
          onSearch={this.handleSearch}
          results={results}
        />
      </div>
    );
  };
}
export default FindRecordsContainer;

export interface FindRecordsUIProps {
  results?: RecordListItem[];
  onSearch: (query: SearchParams) => void;
  onCreateCase: (record: RecordListItem) => void;
}
