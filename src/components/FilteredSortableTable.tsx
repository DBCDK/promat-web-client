import React from "react";
import { TableProps } from "react-bootstrap";
import SortableTable, {
  SortableTableData,
  SortableTableColumn,
} from "./SortableTable";

interface Props<T> {
  data: SortableTableData<T>;
  columns: SortableTableColumn<T>[];
  tableProps?: TableProps;
  filterCallback: (value: T, index: number, array: T[]) => boolean;
  emptyDataView?: React.ReactNode;
  // This key should be generated from all relevant filter parameters.
  // It can be a JSON string of an object with the parameters.
  // This is to ensure that the filter algorithm is only called when
  // the filter terms are changing.
  uniqueFilterKey: string;
}

interface State<T> {
  filteredData: SortableTableData<T>;
}

export default class FilteredSortableTable<T> extends React.Component<
  Props<T>,
  State<T>
> {
  state: State<T> = { filteredData: [] };

  componentDidMount = () => {
    this.applyFilter();
  };

  componentDidUpdate = (prevProps: Props<T>) => {
    const { data, uniqueFilterKey } = this.props;
    if (
      prevProps.data !== data ||
      prevProps.uniqueFilterKey !== uniqueFilterKey
    ) {
      this.applyFilter();
    }
  };

  applyFilter = () => {
    const { data, filterCallback } = this.props;
    const filteredData = data.filter(filterCallback);
    this.setState({ filteredData });
  };

  render = () => {
    const { tableProps, columns, emptyDataView } = this.props;
    const { filteredData } = this.state;
    return (
      <SortableTable
        tableProps={tableProps}
        columns={columns}
        data={filteredData}
        emptyDataView={emptyDataView}
      />
    );
  };
}
