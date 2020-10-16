import { storiesOf } from "@storybook/react";
import React from "react";
import { SortableTableColumn, SortableTableData } from "./SortableTable";
import FilteredSortableTable from "./FilteredSortableTable";
import { Form } from "react-bootstrap";

interface TableDataObject {
  a: string;
  b: string;
  c: string;
  d: string;
  aRaw: number;
}

const data: SortableTableData<TableDataObject> = [
  {
    a: "1",
    aRaw: 1,
    b: "2",
    c: "5",
    d: "4",
  },
  {
    a: "13",
    aRaw: 13,
    b: "3242",
    c: "3234",
    d: "4234",
  },
  {
    a: "2",
    aRaw: 2,
    b: "3242",
    c: "3234",
    d: "4234",
  },
];

const columns: SortableTableColumn<TableDataObject>[] = [
  { key: "a", comparatorField: "aRaw", header: "Col A" },
  { key: "c", comparatorField: "c" },
  { key: "d", header: "Col D" },
];

storiesOf("FilteredSortableTable", module).add("default", () => (
  <FilteredSortableExampleComponent data={data} columns={columns} />
));

// Creating an example component to show how to use it

interface Props {
  data: SortableTableData<TableDataObject>;
  columns: SortableTableColumn<TableDataObject>[];
}

interface State {
  shouldABeZero: boolean;
  shouldABelargerThan1: boolean;
  shouldDNotContain42: boolean;
}

class FilteredSortableExampleComponent extends React.Component<Props, State> {
  ref = React.createRef<FilteredSortableTable<TableDataObject>>();
  state: State = {
    shouldABeZero: false,
    shouldABelargerThan1: false,
    shouldDNotContain42: false,
  };

  handleToggleShouldABeZero = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState(
      { shouldABeZero: event.target.checked },
      this.handleFilterChange
    );

  handleToggleShouldABelargerThan1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    this.setState(
      { shouldABelargerThan1: event.target.checked },
      this.handleFilterChange
    );

  handleToggleShouldDNotContain42 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    this.setState(
      { shouldDNotContain42: event.target.checked },
      this.handleFilterChange
    );

  handleFilterChange = () => this.ref.current && this.ref.current.applyFilter();

  filterCallback = (value: TableDataObject) => {
    const {
      shouldABeZero,
      shouldABelargerThan1,
      shouldDNotContain42,
    } = this.state;

    if (shouldABeZero) {
      if (value["aRaw"] !== 0) {
        return false;
      }
    }
    if (shouldABelargerThan1) {
      if (value["aRaw"] <= 1) {
        return false;
      }
    }
    if (shouldDNotContain42) {
      if (value["d"].includes("42")) {
        return false;
      }
    }
    return true;
  };

  render = () => {
    const { columns, data } = this.props;
    const {
      shouldDNotContain42,
      shouldABeZero,
      shouldABelargerThan1,
    } = this.state;
    return (
      <div>
        <Form.Check
          type="checkbox"
          label="A should be 0"
          key="shouldABeZero"
          checked={shouldABeZero}
          onChange={this.handleToggleShouldABeZero}
        />
        <Form.Check
          type="checkbox"
          checked={shouldABelargerThan1}
          key="shouldABelargerThan1"
          label="A should larger than  1"
          onChange={this.handleToggleShouldABelargerThan1}
        />
        <Form.Check
          type="checkbox"
          key="shouldDNotContain42"
          checked={shouldDNotContain42}
          label="D should not contain 42"
          onChange={this.handleToggleShouldDNotContain42}
        />
        <FilteredSortableTable
          columns={columns}
          data={data}
          filterCallback={this.filterCallback}
          ref={this.ref}
        />
      </div>
    );
  };
}
