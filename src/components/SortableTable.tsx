import React from "react";
import { Table, TableProps } from "react-bootstrap";

// Returns the relevant comparator function
function getComparatorForKey<T>(key: keyof T, reverse: boolean = false) {
    return (a: T, b: T) => {
      if (a[key] > b[key] || b[key] === undefined || b[key] === null) {
        return reverse ? -1 : 1;
      }
      if (a[key] < b[key] || a[key] === undefined || a[key] === null) {
        return reverse ? 1 : -1;
      }
      return 0;
    };
}

interface THProps {
  column: SortableTableColumn;
  onClick: (column: SortableTableColumn) => void;
  currentKey?: string;
  isReversed: boolean;
}

// Custom table header that handles sorting etc. 
function TH({ column, onClick, currentKey, isReversed }: THProps) {
    if (column.comparatorField === undefined) {
      return <th>{column.header || ""}</th>;
    }
    const isCurrent = currentKey === column.key;
    return (
      <th
        style={{ border: isCurrent ? "1px solid black" : "1px dashed black" }}
        onClick={() => onClick(column)}
      >
        {column.header || ""}
        {isCurrent && isReversed && " ▼"}
        {isCurrent && !isReversed && " ▲"}
      </th>
    );
  }
  

export type SortableTableRow = { [key in string]: any };
export type SortableTableData = SortableTableRow[];
export type SortableTableColumn = {
  key: string;
  header?: string;
  comparatorField?: string;
};

interface Props {
  data: SortableTableData;
  columns: SortableTableColumn[];
  tableProps?: TableProps;
}

interface State {
  sortedData: SortableTableData;
  currentSortedColumnKey?: string;
  isSortingReversed: boolean;
}

export default class SortableTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { sortedData: props.data, isSortingReversed: false };
  }

  handleSortByColumn = (column: SortableTableColumn) =>
    this.setState((prevState: State) => {
      const { isSortingReversed, currentSortedColumnKey } = prevState;

      if (typeof column.comparatorField !== "string") {
        return null;
      }

      const isReversed =
        currentSortedColumnKey === column.key ? !isSortingReversed : false;

      const { data } = this.props;
      const comparator = getComparatorForKey(column.comparatorField, isReversed);
      const sortedData = data.sort(comparator);
      return {
        sortedData,
        currentSortedColumnKey: column.key,
        isSortingReversed: isReversed,
      };
    });

  render = () => {
    const { tableProps, columns } = this.props;
    const {
      sortedData,
      currentSortedColumnKey,
      isSortingReversed,
    } = this.state;

    return (
      <Table {...(tableProps || {})}>
        <thead>
          <tr>
            {columns.map((col) => (
              <TH
                onClick={this.handleSortByColumn}
                isReversed={isSortingReversed}
                currentKey={currentSortedColumnKey}
                column={col}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr>
              {columns.map((col) => (
                <td>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
}
