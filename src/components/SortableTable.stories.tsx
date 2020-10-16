import { storiesOf } from "@storybook/react";
import React from "react";
import SortableTable, {
  SortableTableData,
  SortableTableColumn,
} from "./SortableTable";

const data: SortableTableData = [
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
const columns: SortableTableColumn[] = [
  { key: "a", comparatorField: "aRaw", header: "Col A" },
  { key: "c", comparatorField: "c" },
  { key: "d", header: "Col D" },
];
storiesOf("SortableTable", module).add("default", () => (
  <SortableTable
    data={data}
    columns={columns}
    tableProps={{ bordered: true }}
  ></SortableTable>
));
