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

interface THProps<T> {
  column: SortableTableColumn<T>;
  onClick: (column: SortableTableColumn<T>) => void;
  currentKey?: string;
  isReversed: boolean;
}

// Custom table header that handles sorting etc.
function TH<T>({ column, onClick, currentKey, isReversed }: THProps<T>) {
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

// export type SortableTableRow<T> = { [key in string]: T };
export type SortableTableData<T> = T[];
export type SortableTableColumn<T> = {
  key: keyof T;
  header?: string;
  comparatorField?: keyof T;
};

interface Props<T> {
  data: SortableTableData<T>;
  columns: SortableTableColumn<T>[];
  tableProps?: TableProps;
}

interface State<T> {
  sortedData: SortableTableData<T>;
  currentSortedColumnKey?: string;
  isSortingReversed: boolean;
}

export default class SortableTable<T> extends React.Component<
  Props<T>,
  State<T>
> {
  constructor(props: Props<T>) {
    super(props);
    this.state = { sortedData: props.data, isSortingReversed: false };
  }

  handleSortByColumn = (column: SortableTableColumn<T>) =>
    // @ts-ignore
    this.setState((prevState) => {
      const { isSortingReversed, currentSortedColumnKey } = prevState;

      const isReversed =
        currentSortedColumnKey === column.key ? !isSortingReversed : false;

      const { data } = this.props;
      const comparator =
        column.comparatorField !== undefined &&
        getComparatorForKey(column.comparatorField, isReversed);

      if (!comparator) {
        return null;
      }

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
          {sortedData.map((row: T) => (
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
